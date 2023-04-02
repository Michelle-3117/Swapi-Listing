FROM node:14-alpine AS compilation

WORKDIR /app

COPY ./package.json .

RUN yarn

COPY . .

RUN yarn tsc

CMD ["yarn", "start"]