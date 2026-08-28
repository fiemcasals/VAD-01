FROM nginx:alpine

# Copia los archivos de tu presupuesto al directorio donde Nginx sirve los sitios web
COPY . /usr/share/nginx/html/

# Expone el puerto 80
EXPOSE 80

# Comando por defecto para correr Nginx
CMD ["nginx", "-g", "daemon off;"]
