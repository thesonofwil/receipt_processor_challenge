# Start your image with a node base image
FROM node:18

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]