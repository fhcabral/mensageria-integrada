ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=4005

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

RUN npm install -g npm@latest
COPY --link package.json package-lock.json .
RUN rm -rf node_modules package-lock.json
RUN npm install --legacy-peer-deps --omit=dev

COPY --link . .

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]