FROM node:latest as build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 4200
CMD npm run build

FROM nginx:latest
COPY --from=build /usr/src/app/dist/InvoiceManagerClient /usr/share/nginx/html
