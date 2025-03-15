FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4100

CMD ["npm", "run", "dev"]
