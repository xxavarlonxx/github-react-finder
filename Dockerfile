FROM node:12-alpine as build-step
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.4-alpine
COPY --from=build-step /usr/src/app/build /usr/share/nginx/html