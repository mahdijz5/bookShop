FROM node:lts-alpine As dev
WORKDIR /app

ARG APP_NAME
  
COPY package*.json ./
RUN npm ci --quiet
COPY ./ ./

RUN npm run build ${APP_NAME}

FROM node:lts-alpine as prod
WORKDIR /app

COPY package*.json ./
RUN npm ci --quiet --omit=dev
COPY --from=dev /app/dist/ dist

ARG APP_NAME
ENV APP_PATH=/app/dist/apps/${APP_NAME}/apps/${APP_NAME}/src/main 

COPY apps/${APP_NAME}/.env.prod ./apps/${APP_NAME}/.env
 
CMD ["sh", "-c", "node $APP_PATH"]
