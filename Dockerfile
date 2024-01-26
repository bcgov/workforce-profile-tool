ARG BASE_IMAGE=docker.io/node:16-alpine
ARG APP_ROOT=/opt/app-root/src

FROM ${BASE_IMAGE} as app
ENV NODE_ENV production
ARG APP_ROOT

#RUN mkdir -p /tmp
#WORKDIR /tmp
RUN mkdir -p ${APP_ROOT}
WORKDIR ${APP_ROOT}

COPY frontend .
RUN chown node:node .
RUN yarn install --frozen-lockfile --production && yarn cache clean

#RUN mv /tmp/build/* ${APP_ROOT} && cd .. && rm -r /tmp

#WORKDIR ${APP_ROOT}
RUN yarn global add serve
USER node
CMD ["serve","-p","80","-s","."]