FROM node:18.0.0-alpine

RUN mkdir -p /home/athlete-registration-system/server
WORKDIR /home/athlete-registration-system/server
COPY package.json package-lock.json tsconfig.json ./
COPY prisma ./prisma

RUN npm ci

COPY src ./src

RUN npm run build && \
    npm prune --production


EXPOSE 3000

CMD ["node", "./dist/index.js"]