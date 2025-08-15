ARG BASE_IMAGE=058264451049.dkr.ecr.ap-south-1.amazonaws.com/nodejs:latest
FROM ${BASE_IMAGE} As build

LABEL Marketplace-frontend-apisversion="1.0.0.1" \
      contact="Chandan" \
      description="A minimal Node.js Docker image for marketplace-frontend application in Staging" \
      base.image="Node" \
      maintainer="chandan@gmail.com"

ENV TZ=Asia/Kolkata

# Set the timezone
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app
ADD . /app


# Install dependencies again
#test123456
 # Install dependencies (this is where npm install will happen)
RUN npm install

# Build the app
RUN npm run build

# Final stage
FROM 058264451049.dkr.ecr.ap-south-1.amazonaws.com/nodejs:latest
WORKDIR /app
COPY --from=build /app .

# Set a non-root user
USER node

EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
