FROM node:14 as builder

ENV NODE_ENV=development

WORKDIR /build

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .

RUN npm run build

FROM node:14 as Production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package*.json ./
COPY --from=builder /build/prisma ./prisma

ENV PORT 8080
ENV JWT_PUBLIC_KEY 'undefined'

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]