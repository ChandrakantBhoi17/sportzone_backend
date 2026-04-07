FROM node:20

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 4000

# Start app
CMD ["node", "dist/index.js"]
