# ---------- Build Stage ----------
FROM 773195032970.dkr.ecr.ap-south-1.amazonaws.com/node:latest AS build

ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

# Copy only package files first (better cache)
COPY package*.json ./

# Update npm to latest to avoid known bugs
RUN npm install -g npm@latest

# Install all deps (including devDeps for react-scripts)
ENV NODE_ENV=development
RUN npm install --legacy-peer-deps

# Copy rest of the code
COPY . .

# Build production files
RUN npm run build

# ---------- Run Stage ----------
FROM 773195032970.dkr.ecr.ap-south-1.amazonaws.com/node:latest

WORKDIR /app

# Copy only the build folder and package files
COPY --from=build /app/build ./build
COPY package*.json ./

# Install only production deps
ENV NODE_ENV=production
RUN npm install --only=production --legacy-peer-deps

EXPOSE 3000
CMD ["npm", "run", "start"]
