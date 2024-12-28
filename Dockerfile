# Etapa de construcción de la aplicación React
FROM node:20 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa de despliegue con Apache
FROM httpd:2.4

# Copiar archivos estáticos de React
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Crear directorios de logs
RUN mkdir -p /var/log/apache2 && \
    touch /var/log/apache2/error.log && \
    touch /var/log/apache2/access.log && \
    chmod -R 755 /var/log/apache2

# Copiar configuración personalizada SIN REEMPLAZAR `httpd.conf`
COPY apache.conf /usr/local/apache2/conf/extra/react.conf

# Incluir la configuración personalizada en el archivo principal
RUN echo "Include conf/extra/react.conf" >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]
