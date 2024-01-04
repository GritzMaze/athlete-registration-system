FROM node:18.0.0-alpine3.14
RUN npm i -g npm@8.10.0

RUN addgroup --gid 990 athlete-regystration-system
RUN adduser athlete-regystration-system --home /home/athlete-regystration-system --uid 990 --system -G athlete-regystration-system

USER athlete-regystration-system

RUN mkdir /home/athlete-regystration-system/client
WORKDIR /home/athlete-regystration-system/client
COPY --chown=athlete-regystration-system ./package*.json ./

RUN npm install

COPY --chown=athlete-regystration-system . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start" ]