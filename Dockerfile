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

# Deploy stage - using a lightweight server for local testing
FROM nginx:alpine AS deploy
COPY --from=build /app/dist /usr/share/nginx/html
# or if your build outputs to a different directory, adjust accordingly:
# COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

# Add a default command to start nginx
CMD ["nginx", "-g", "daemon off;"]

# We'll also create a separate target just for the build artifacts
FROM scratch AS artifacts
COPY --from=build /app/dist /
# or if your build outputs to a different directory, adjust accordingly:
# COPY --from=build /app/build /
