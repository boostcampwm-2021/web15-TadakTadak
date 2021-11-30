FROM node:16.13.0 as base
MAINTAINER team pallete:tadaktadak

RUN mkdir -p /app
WORKDIR /app
ADD ./ /app
RUN npm install
ENV NODE_ENV=production
RUN npm run build
CMD node dist/src/main.js