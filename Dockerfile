FROM ubuntu:latest

RUN apt-get update && apt-get install -y sudo curl && rm -rf /var/lib/apt/lists/*
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

# Update apt-get sources AND install MongoDB
RUN apt-get update && sudo apt-get install -y --allow-unauthenticated mongodb-org

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Install node
RUN sudo apt-get install -y nodejs
RUN sudo apt-get install -y npm

# Copy restful-booker across
RUN mkdir /restful-booker

COPY ./ /restful-booker/

RUN cd /restful-booker && npm install

CMD mongod & sleep 5 && cd /restful-booker && npm start
