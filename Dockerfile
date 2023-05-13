# Base image
FROM node:19

# Create app directory
WORKDIR /usr/src/app

# Copy source files
COPY . /usr/src/app


# Install app dependencies
RUN npm i -g pnpm
RUN pnpm install --shamefully-hoist
RUN NODE_ENV=development pnpm build

# Creates a "dist" folder with the production build
# Start the server using the production build
CMD [ "pnpm", "run", "start:prod" ]

EXPOSE 3000