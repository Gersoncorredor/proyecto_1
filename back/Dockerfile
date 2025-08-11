# modelo base 
FROM node:22

WORKDIR /app

# Copiar los archivos
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
