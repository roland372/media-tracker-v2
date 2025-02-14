FROM node:20

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

EXPOSE 8080

# Command to run the Vue app
CMD ["npm", "run", "dev"]
