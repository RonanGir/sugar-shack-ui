FROM nginx:alpine

COPY dist/sugar-shack-ui/browser/ /usr/share/nginx/html/app/
COPY conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
