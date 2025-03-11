# # Build
FROM node:18 AS builder

WORKDIR /usr/src/

# USEFUL TO CACHE IMAGE LAYERS
ADD package.json .
ADD package-lock.json .
RUN npm install

ADD . .

ENV NODE_ENV production

RUN npm run build

# # Run
EXPOSE 3000

# Commande pour démarrer l'application en utilisant le fichier main.js
CMD ["npm", "run", "start"]