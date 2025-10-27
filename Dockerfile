FROM node:lts-alpine


WORKDIR /app

COPY package*.json ./

# install client
COPY client/package*.json client/
RUN npm run install-client --omit=dev

# install server
COPY server/package*.json server/
RUN npm run install-server --omit=dev

# build client
COPY client/ client/
RUN npm run build --prefix client

# run server
COPY server/ server/

USER node

CMD [ "npm" , "start" , "--prefix" , "server" ]

EXPOSE 8000