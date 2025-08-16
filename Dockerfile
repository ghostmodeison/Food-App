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

RUN npm install

RUN npm run build

FROM ${BASE_IMAGE}

WORKDIR /app

COPY --from=build /app .

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]
