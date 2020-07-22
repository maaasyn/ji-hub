FROM node:lts-alpine
RUN mkdir -p home/node/app
WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn
# COPY . .
CMD ["yarn", "start"]