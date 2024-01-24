ARG BASE_IMAGE=docker.io/node:16-alpine
ARG APP_ROOT=/opt/app-root/src

FROM ${BASE_IMAGE} as app

COPY frontend ${APP_ROOT}

WORKDIR ${APP_ROOT}
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
