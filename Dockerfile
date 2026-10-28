FROM nginx:alpine
# pick up Alpine security fixes the nginx base image has not shipped yet
RUN apk upgrade --no-cache
COPY code/ /usr/share/nginx/html/
EXPOSE 80
