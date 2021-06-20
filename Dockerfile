FROM node:14.17-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
RUN ls
RUN ls /usr/app/
CMD ["npm", "start"]