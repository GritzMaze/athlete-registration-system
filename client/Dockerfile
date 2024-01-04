FROM node:18.0.0-alpine3.14

RUN mkdir /home/athlete-regystration-system/client
WORKDIR /home/athlete-regystration-system/client
COPY client/package.json client/package-lock.json ./

RUN npm ci

COPY client/src ./src
COPY client/public ./public

RUN npm run build && \
    npm prune --production

EXPOSE 8080

CMD [ "npm", "run", "start" ]