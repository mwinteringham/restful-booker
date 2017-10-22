FROM ubuntu:latest

RUN apt-get update && apt-get install -y sudo curl && rm -rf /var/lib/apt/lists/*

# Install node
# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# make sure apt is up to date
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN sudo apt-get install -y build-essential libssl-dev

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 4.2.4

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Copy restful-booker across
RUN mkdir /restful-booker

COPY ./ /restful-booker/

RUN cd /restful-booker && npm install

CMD mongod & sleep 5 && cd /restful-booker && npm start
