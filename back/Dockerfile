# development builder
FROM node:18.16-alpine AS development

COPY package*.json ./

RUN npm install -g node-gyp 

RUN npm install node-gyp -g
RUN npm install bcrypt -g

RUN npm install bcrypt --save

RUN npm install -g yarn

RUN yarn install

RUN yarn add --arch=arm64 --platform=linuxmusl sharp

COPY . .

RUN yarn build

# development runner (ARM/M1 compatible)
FROM --platform=linux/amd64 node:18.16-alpine AS runner

COPY --from=development . .

WORKDIR /usr/app