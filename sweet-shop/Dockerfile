FROM node

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm","start"]
