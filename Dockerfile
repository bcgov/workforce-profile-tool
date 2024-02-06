# Use node alpine as build image
ARG BUILD_IMAGE=docker.io/node:16-alpine
ARG PROD_IMAGE=nginx:alpine
#ARG PROD_IMAGE=nginxinc/nginx-unprivileged:alpine
ARG APP_ROOT=/opt/app-root/src

FROM ${BUILD_IMAGE} as builder
ENV NODE_ENV production
ARG APP_ROOT

# Set working directory in build container
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

# Build
COPY frontend .
#RUN chown -R 101:0 ${APP_ROOT}
#RUN chown node:node .
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Use Nginx as the production server
FROM ${PROD_IMAGE}

ARG APP_ROOT

WORKDIR ${APP_ROOT}
COPY --from=builder ${APP_ROOT}/build/ /usr/share/nginx/html
#RUN chown nginx:nginx /usr/share/nginx/html/*
#USER nginx

#RUN yarn global add serve
EXPOSE 8080
#RUN chown -R 101:0 /usr/share/nginx/html/*
#USER 1001
CMD ["nginx","-g","daemon off;"]
