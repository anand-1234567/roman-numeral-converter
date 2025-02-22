FROM node:23-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source
COPY . .

# Build the app
RUN pnpm build

# Expose the app and the metrics ports
EXPOSE 8080 9464

# Start the app
CMD ["pnpm", "start"] 