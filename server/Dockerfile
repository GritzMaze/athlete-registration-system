FROM node:18.0.0-alpine

RUN mkdir -p /home/athlete-registration-system/server
WORKDIR /home/athlete-registration-system/server
COPY server/package.json server/package-lock.json server/tsconfig.json ./
COPY server/prisma ./prisma

RUN npm ci

COPY server/src ./src

RUN npm run build && \
    npm prune --production

ENV NODE_ENV=production

EXPOSE 3000

CMD  npx prisma migrate deply && node dist/index.js