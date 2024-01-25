#ARG BASE_IMAGE=docker.io/node:16-alpine
ARG BASE_IMAGE=docker.io/node:16.17.0-bullseye-slim
ARG APP_ROOT=/opt/app-root/src

FROM ${BASE_IMAGE} as builder
ENV NODE_ENV production

RUN mkdir -p /app
WORKDIR /app

COPY frontend .
RUN chown node:node .
RUN yarn install --frozen-lockfile --production && yarn cache clean

FROM ${BASE_IMAGE} as app
ENV NODE_ENV production

ARG APP_ROOT

RUN mkdir -p ${APP_ROOT}

WORKDIR ${APP_ROOT}
RUN yarn global add serve
COPY --from=builder /app/build .
USER node
CMD ["serve","-p","80","-s","."]