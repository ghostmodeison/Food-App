ARG BASE_IMAGE=773195032970.dkr.ecr.ap-south-1.amazonaws.com/node:latest
FROM ${BASE_IMAGE} AS build

ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
COPY . .

# Install dependencies including devDependencies
ENV NODE_ENV=development
RUN npm cache clean --force && npm install --legacy-peer-deps

# Build the React app
RUN npm run build

# ---- Final production image ----
FROM ${BASE_IMAGE}
WORKDIR /app

# Copy only build output
COPY --from=build /app/build ./build

# Install only production dependencies
COPY package*.json ./
ENV NODE_ENV=production
RUN npm install --only=production --legacy-peer-deps

USER node
EXPOSE 3000
CMD ["npm", "run", "start"]
