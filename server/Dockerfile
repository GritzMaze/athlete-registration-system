FROM node:18.0.0-alpine3.14
RUN npm i -g npm@8.10.0

RUN addgroup --gid 990 athlete-registration-system
RUN adduser athlete-registration-system --home /home/athlete-registration-system --uid 990 --system -G athlete-registration-system

USER athlete-registration-system

RUN mkdir /home/athlete-registration-system/server
WORKDIR /home/athlete-registration-system/server
COPY --chown=athlete-registration-system ./package*.json ./
COPY ./prisma prisma

RUN npm install

COPY --chown=athlete-registration-system . .

EXPOSE 3000

CMD [ "npm", "run", "ci:start" ]