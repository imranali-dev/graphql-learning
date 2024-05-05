FROM ubuntu

RUN  apt-get update
RUN npm install -g nodemon
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY index.ts index.ts

CMD ["nodemon", "index.ts"]