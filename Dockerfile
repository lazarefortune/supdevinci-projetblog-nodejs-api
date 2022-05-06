FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
COPY .env.example .env

RUN npm install -g npm@8.9.0
RUN npm install

EXPOSE 4000

CMD ["npm", "run", "build"]