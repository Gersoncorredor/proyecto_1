# Imagen base 
FROM node:22

# Crear carpeta proyecto1
WORKDIR /proyecto1

# Copiar archivos de dependecias
COPY package.json ./

# Instalar dependecias 
RUN npm install

# Copiar el resto del codigo
COPY . .
RUN npm run build


EXPOSE 5173
CMD ["npm","run","dev"]