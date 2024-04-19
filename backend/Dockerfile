# Use Node.js latest image as base
FROM node:16

# Set the maximum heap size
ENV NODE_OPTIONS="--max_old_space_size=2048"

# Set the working directory in the container for backend
WORKDIR /app

# Copy backend package.json and package-lock.json
COPY ./backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code
COPY ./backend/ ./

# Expose port 4000 (if required)
EXPOSE 4000

# Command to run the backend server
CMD ["npm", "run", "dev"]
