# Imagen base 
FROM node:22 as build

# Crear carpeta proyecto1
WORKDIR /app

# Copiar archivos 
COPY . .

# Instalar dependecias 
RUN npm install

# Copila el codigo
RUN npm run build
# Copiar el resto del codigo
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80
CMD ["nginx","-g","daemon off;"]