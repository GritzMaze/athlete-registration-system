FROM node:18.0.0-alpine

ARG DATABASE_URL

ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}

RUN mkdir -p /home/athlete-registration-system/server
WORKDIR /home/athlete-registration-system/server
COPY server/package.json server/package-lock.json server/tsconfig.json ./
COPY server/prisma ./prisma

RUN npm ci

COPY server/src ./src

RUN npm run build && \
    npm prune --production


EXPOSE 3000

CMD ["node", "./dist/index.js"]