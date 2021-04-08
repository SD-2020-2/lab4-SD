FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY server/package*.json ./

RUN npm install

# Bundle app source
COPY server/. .

EXPOSE 8080

CMD [ "sudo ","node", "main.js" ]