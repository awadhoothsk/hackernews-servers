FROM node:22.1.0

# Set working directory
WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client if schema exists
RUN if [ -f "./prisma/schema.prisma" ]; then npx prisma generate; else echo "Skipping prisma generate"; fi

# Build the application
RUN npm run build

# Expose the port your app listens on
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]
