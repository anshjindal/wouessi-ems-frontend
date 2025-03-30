FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend project
COPY . .

# Build the frontend app for production
RUN npm run build

# Expose the frontend service port (3000 in this case)
EXPOSE 3000

# Start the frontend service
CMD ["npm", "start"]
