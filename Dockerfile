FROM node:14.15-alpine AS MenheraPicasso

WORKDIR /usr/home/picasso

COPY . .

RUN npm install

CMD [ "npm", "start" ]