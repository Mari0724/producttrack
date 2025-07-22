# Dummy change to trigger Railway build

# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY . .

# Instala dependencias
RUN npm install

# Genera el cliente de Prisma (si lo usas)
RUN npx prisma generate

# Compila TypeScript
RUN npm run build

# Expone el puerto (asegúrate de que tu app escuche en este puerto)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]