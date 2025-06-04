FROM node:18

WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Prevent React from treating warnings as errors in CI
ENV CI=false
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=2048

# Build the React app
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build"]
