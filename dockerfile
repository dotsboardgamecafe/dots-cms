FROM node:18-alpine AS build_stage

ARG stage=prod

WORKDIR /app

COPY package*.json ./
COPY . .

RUN yarn build

# PACKAGING STAGE

FROM node:18-alpine AS packaging_stage

WORKDIR /app

RUN yarn global add sharp

ENV NEXT_SHARP_PATH=/usr/local/lib/node_modules/sharp

COPY --from=build_stage /app/.next/standalone ./
COPY --from=build_stage /app/public ./public
COPY --from=build_stage /app/.next/static ./.next/static

ENV PORT=3001
ENV HOSTNAME=0.0.0.0

EXPOSE 3001

CMD [ "node", "./server.js" ]