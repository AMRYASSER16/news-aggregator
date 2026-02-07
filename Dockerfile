FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG REACT_APP_NEWS_API_KEY
ARG REACT_APP_GUARDIAN_API_KEY
ARG REACT_APP_NYTIMES_API_KEY

ENV REACT_APP_NEWS_API_KEY=$REACT_APP_NEWS_API_KEY
ENV REACT_APP_GUARDIAN_API_KEY=$REACT_APP_GUARDIAN_API_KEY
ENV REACT_APP_NYTIMES_API_KEY=$REACT_APP_NYTIMES_API_KEY

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
