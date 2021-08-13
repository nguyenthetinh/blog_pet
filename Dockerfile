FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

# Expose API port
EXPOSE 3000

# Run the web service on container startup.
CMD [ "npm", "start" ]