FROM node:lts-alpine
RUN mkdir -p home/node/app

WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN npm install --save sqlite3
RUN npm install
# COPY . .
CMD ["yarn", "start"]