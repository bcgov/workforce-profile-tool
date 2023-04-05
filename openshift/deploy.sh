#
# SCRIPT SETUP
#

# Colors
BOLD_RED='\033[1;31m'
BOLD_GREEN='\033[1;32m'
BOLD_PURPLE='\033[1;35m'
NO_COLOR='\033[0m'

# Helper methods to try a command and quit if it fails
yell() { echo "${BOLD_RED}$0: $*" >&2; }
die() { yell "$*"; exit 111; }
try() { "$@" || die "cannot $*"; }

# Helper methods to color info / success output
info() { echo "${BOLD_PURPLE}$1${NO_COLOR}"; }
success() { echo "${BOLD_GREEN}$1${NO_COLOR}"; }

#
#
# MAIN SHELL SCRIPT
#
#
info "Build + deploy script for WFP frontend"
info "---------------------------------------"
echo ""

# 1. Set up variables
info "Reading variables from deploy_vars.sh..."
try source ./deploy_vars.sh
echo ""

# Add service account to tools from dev?
# See https://github.com/BCDevOps/devops-platform-workshops/blob/master/101-lab/content/03_deployment.md

# 2. Switch to tools project
info "Switching to tools namespace ${TOOLS_NAMESPACE}..."
try oc project $TOOLS_NAMESPACE
echo ""

# 3. Set up build config
info "Updating OpenShift build from bc.yaml..."
try oc process -f ./bc.yaml -p NAME=$NAME IMAGE_TAG=$IMAGE_TAG TOOLS_NAMESPACE=$TOOLS_NAMESPACE | try oc apply -f -
echo ""

if [ "$DO_BUILD" = true ] ; then

  # 4a. Do a local build
  info "Performing local yarn build..."
  # If included in the build, __ENV.js will mess up the env loading
  rm -f ../public/config/__ENV.js
  try yarn --cwd ../ install
  try yarn --cwd ../ build
  echo ""

  # 4b. Load artifact
  info "Starting OpenShift build from local artifact. This may take a while..."
  try oc start-build $NAME --from-dir=../build --wait --follow
  echo ""

else

  info "Skipping build (set DO_BUILD var to true to enable)..."
  echo ""

fi

# 5. Switch to actual project
info "Switching to project namespace ${DEPLOY_NAMESPACE}..."
try oc project $DEPLOY_NAMESPACE
echo ""

# 6. Set up deploy config
info "Updating OpenShift deployment from dc.yaml..."
try oc process -f ./dc.yaml -p NAME=$NAME \
  IMAGE_NAME=$NAME IMAGE_TAG=$IMAGE_TAG IMAGE_NAMESPACE=$IMAGE_NAMESPACE \
  DEPLOY_NAMESPACE=$DEPLOY_NAMESPACE BASE_OPENSHIFT_URL=$BASE_OPENSHIFT_URL \
  | try oc apply -f -
echo ""

success "Done."
