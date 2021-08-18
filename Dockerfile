FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

# Copy important files - Add ormconfig.ts here if using Typeorm
COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./

# Copy env
COPY docker.env /usr/src/app

RUN npm run build

# Expose API port
EXPOSE 3000

# Run the web service on container startup.
CMD [ "npm", "start" ]