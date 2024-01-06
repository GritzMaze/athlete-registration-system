FROM node:18.0.0-alpine3.14

ARG REACT_APP_STRIPE_PUBLISHABLE_KEY
ARG REACT_APP_STRIPE_PRICE_ID
ARG REACT_APP_SERVER_URL

ENV REACT_APP_STRIPE_PUBLISHABLE_KEY=${REACT_APP_STRIPE_PUBLISHABLE_KEY}
ENV REACT_APP_STRIPE_PRICE_ID=${REACT_APP_STRIPE_PRICE_ID}
ENV REACT_APP_SERVER_URL=${REACT_APP_SERVER_URL}

RUN mkdir -p /home/athlete-regystration-system/client
WORKDIR /home/athlete-regystration-system/client
COPY client/package.json client/package-lock.json client/tsconfig.json ./

RUN npm ci

COPY client/src ./src
COPY client/public ./public

RUN npm install -g serve

RUN npm run build && \
    npm prune --production

EXPOSE 8080

CMD serve -s build