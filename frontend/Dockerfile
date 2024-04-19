# Use Node.js LTS image as base
FROM node:14

# Set the maximum heap size
ENV NODE_OPTIONS="--max_old_space_size=2048"

# Set the working directory in the container for frontend
WORKDIR /app

# Copy frontend package.json and package-lock.json
COPY ./frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY ./frontend/ ./

# Expose port 3000
EXPOSE 3000

# Start Nginx server
CMD ["npm", "start"]
