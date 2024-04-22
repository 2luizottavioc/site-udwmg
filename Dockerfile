FROM nginx as production-stage
RUN mkdir /app
COPY ./ /app
COPY docker/nginx.conf /etc/nginx/nginx.conf