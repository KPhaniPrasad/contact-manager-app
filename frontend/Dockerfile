FROM node:18

WORKDIR /app
COPY . .

# Disable React's CI mode that fails on warnings
ENV CI=false

RUN npm install
RUN npm run build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build"]
