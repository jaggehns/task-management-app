FROM node:18.19.1-alpine AS base

WORKDIR /usr/src/app

FROM base AS deps

COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile

FROM deps AS build

COPY . .
RUN yarn run build

FROM base AS production

ENV NODE_ENV=production

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/vite.config.ts ./vite.config.ts
COPY --from=build /usr/src/app/src/server/prisma ./src/server/prisma  

EXPOSE 3000

CMD ["sh", "-c", "yarn prisma:generate && yarn prisma:migrate:deploy && node dist/server/main.js"]
