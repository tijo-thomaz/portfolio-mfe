# Build stage
FROM node:16-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Set the homepage for GitHub Pages
RUN npm pkg set homepage="https://tijo-thomaz.github.io/portfolio-mfe"

# Build the application
RUN npm run build

# List the contents to debug the output directory
RUN ls -la

# Deploy stage - using a lightweight server for local testing (optional)
FROM nginx:alpine AS deploy

# Try different possible build output directories
# If using webpack with default config
COPY --from=build /app/dist /usr/share/nginx/html
# If the above fails, try this (for Create React App)
# COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

# We'll also create a separate target just for the build artifacts
FROM scratch AS artifacts
# Try different possible build output directories
COPY --from=build /app/dist /
# If the above fails, try this
# COPY --from=build /app/build /
