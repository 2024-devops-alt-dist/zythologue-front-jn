FROM node:18-alpine
WORKDIR /app
RUN npm install --global serve
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
CMD ["serve", "-s", "dist", "-p", "80"]