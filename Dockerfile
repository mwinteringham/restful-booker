FROM ubuntu:latest

# Installation:
# Import MongoDB public GPG key AND create a MongoDB list file
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu $(cat /etc/lsb-release | grep DISTRIB_CODENAME | cut -d= -f2)/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list

# Update apt-get sources AND install sudo 
RUN apt-get update && apt-get install -y sudo

# Install MongoDB
RUN apt-get install -y mongodb-org

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Install node
RUN apt-get -y install curl
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

# Copy restful-booker across
RUN mkdir /restful-booker

COPY ./ /restful-booker/

RUN cd /restful-booker && npm install

CMD mongod & sleep 5 && cd /restful-booker && npm start
