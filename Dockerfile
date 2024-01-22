FROM node

RUN npm install -g @nestjs/cli

EXPOSE 5432

USER node

WORKDIR /home/node/app