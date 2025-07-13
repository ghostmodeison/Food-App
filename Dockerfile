# Step 1: Build the app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Step 2: Run with serve
FROM node:18-alpine

WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy build from previous step
COPY --from=builder /app/build ./build

# Expose port 3000
EXPOSE 3000

# Start app with serve
CMD ["serve", "-s", "build", "-l", "3000"]
