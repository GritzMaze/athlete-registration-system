FROM node:18.0.0-alpine3.14

RUN mkdir -p /home/athlete-registration-system/server
WORKDIR /home/athlete-registration-system/server
COPY ./package*.json tsconfig.json ./
COPY prisma ./prisma

RUN npm ci

COPY src ./src

RUN npm run build && \
    npm prune --production


EXPOSE 3000

CMD node dist/src/index.js