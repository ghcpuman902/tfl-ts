# Local stdio MCP server for Glama and container users.
# TFL_APP_KEY is optional: the server starts and lists tools without it;
# live tools return TFL_MCP_MISSING_APP_KEY until it is set.
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm run build && pnpm pack --pack-destination /tmp && mv /tmp/tfl-ts-*.tgz /tmp/tfl-ts.tgz

FROM node:22-alpine
ENV NODE_ENV=production
COPY --from=build /tmp/tfl-ts.tgz /tmp/tfl-ts.tgz
RUN npm install -g --omit=dev --no-audit --no-fund /tmp/tfl-ts.tgz && rm /tmp/tfl-ts.tgz
USER node
ENTRYPOINT ["tfl", "mcp"]
