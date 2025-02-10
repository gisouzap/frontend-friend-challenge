FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000 3001 8080

CMD ["sh", "-c", "node server.js & npm start"]
