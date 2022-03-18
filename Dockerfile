FROM node

WORKDIR /usr/app

COPY package.json /usr/app/

RUN npm install

COPY . /usr/app/

EXPOSE 3333

CMD ["npm", "run", "dev"]
