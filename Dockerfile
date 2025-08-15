ARG BASE_IMAGE=773195032970.dkr.ecr.ap-south-1.amazonaws.com/node
FROM ${BASE_IMAGE} AS build

ENV TZ=Asia/Kolkata

# Install required build tools for npm + react-scripts
USER root
RUN apk add --no-cache tzdata python3 make g++

# Set the timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
ADD . /app

# Install dependencies (ignore peer deps conflicts if any)
RUN npm install --legacy-peer-deps

# Build the app
RUN npm run build

# Final stage
FROM ${BASE_IMAGE}
RUN apk add --no-cache tzdata

WORKDIR /app
COPY --from=build /app ./

# Set a non-root user
USER node

EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
