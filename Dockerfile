# ---------- Builder Stage ----------
FROM node:20 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build


# ---------- Production Stage ----------
FROM node:20

WORKDIR /app

ENV NODE_ENV=production

# Copy only required files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install only production deps
RUN npm install --omit=dev

# Copy env if needed
COPY --from=builder /app/.env* ./

EXPOSE 4000

CMD ["node", "dist/index.js"]
