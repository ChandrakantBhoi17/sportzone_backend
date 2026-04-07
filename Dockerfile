FROM node:25 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (incl dev for build)
RUN npm ci

# Copy source
COPY . .

# Build TypeScript to dist/
RUN npm run build

# Production stage
FROM node:25

WORKDIR /app
ENV NODE_ENV=production

# Copy built artifacts and prod node_modules (pruned)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env* ./

EXPOSE 4000

# Use npm start (runs node dist/index.js)
CMD ["npm", "start"]

