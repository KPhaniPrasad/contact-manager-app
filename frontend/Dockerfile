FROM node:18

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Disable React's CI mode to prevent build failure on warnings
ENV CI=false

# Build the React app
RUN npm run build

# Install serve to serve the build folder
RUN npm install -g serve

EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "build"]
