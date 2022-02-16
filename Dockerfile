FROM node:14.18.0-alpine3.14

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm i -g npm@latest
RUN npm install

COPY . .
COPY ./public ./

#RUN npm run build

EXPOSE 9500

CMD ["npm", "start"]
