# Utiliza una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto donde la aplicación estará escuchando
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
