FROM node:20.12.2-alpine3.18

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

ARG VITE_API_URL=$VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

RUN pnpm install

COPY . .

RUN pnpm run build

RUN npm install -g serve
