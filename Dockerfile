FROM node:18.12.1

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY prisma/schema.prisma ./
RUN npx prisma generate

COPY . .

RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]