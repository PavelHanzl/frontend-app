# Vyberte základní obraz
FROM node:latest

# Nastavte pracovní adresář ve kontejneru
WORKDIR /app

# Kopírujte soubory package.json a package-lock.json
COPY package*.json ./

# Instalujte závislosti projektu
RUN npm install

# Kopírujte zdrojové soubory projektu
COPY . .

# Exponujte port 3000
EXPOSE 3000

# Spusťte aplikaci
CMD ["npm", "start"]