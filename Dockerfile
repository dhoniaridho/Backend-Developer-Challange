from node:20

RUN npm i -g pnpm
RUN pnpm i
RUN pnpm build

CMD ["pnpm", "start:prod"]
