FROM node:16.14.0-alpine3.15 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16.14.0-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
<<<<<<< HEAD
=======
RUN npm config get proxy
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm config set registry http://registry.npmjs.org/
>>>>>>> f5fcba57a9ece83c8f7eba6996a87df489f6e78c
RUN npm cache clean --force && rm -rf node_modules && npm install
# RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]