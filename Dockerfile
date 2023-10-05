FROM node:18.17.1-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

RUN pnpm run build
CMD ["pnpm", "start"]
