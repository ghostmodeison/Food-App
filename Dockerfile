ARG BASE_IMAGE=773195032970.dkr.ecr.ap-south-1.amazonaws.com/node
FROM ${BASE_IMAGE} AS build

ENV TZ=Asia/Kolkata

# Set the timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
ADD . /app

# Install dependencies again
RUN npm install

# Build the app
RUN npm run build

# Final stage
FROM 773195032970.dkr.ecr.ap-south-1.amazonaws.com/node
WORKDIR /app
COPY --from=build /app .

# Set a non-root user
USER node

EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
