# Base image using Node.js 20 LTS Alpine for a lightweight and secure environment
FROM node:20-alpine AS base
WORKDIR /opt/app

# --- Build Stage ---
# This stage installs all dependencies, including devDependencies, to build the app.
FROM base AS builder
ENV NODE_ENV=development
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
# Set the max memory to 4GB
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build

# --- Production Stage ---
# This is the final, lean production image.
FROM base AS runner
ENV NODE_ENV=production
# Copy package files and install only production dependencies.
COPY package.json package-lock.json* ./
RUN npm install --production
# Copy the built application artifacts from the 'builder' stage.
COPY --from=builder /opt/app/dist ./dist
COPY --from=builder /opt/app/config ./config
COPY --from=builder /opt/app/database ./database
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.strapi ./.strapi

# Expose the port Strapi runs on (default is 1337)
EXPOSE 1337

# The command to start the Strapi application in production mode.
CMD ["npm", "run", "start"]
