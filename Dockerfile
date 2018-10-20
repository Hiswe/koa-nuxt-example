FROM node:10.12.0-alpine

ENV USERNAME node
ENV HOME /home/$USERNAME
ENV APP_PATH $HOME/app
ENV APP_PORT 3000
# ENV DEBUGGER_PORT 9229

# Create app directory
WORKDIR $APP_PATH

# Install app dependencies efficiently
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package*.json /tmp/
RUN cd /tmp && npm install
RUN mv /tmp/node_modules $APP_PATH/node_modules

# Bundle app source
COPY . $APP_PATH

EXPOSE $APP_PORT
# EXPOSE $DEBUGGER_PORT

CMD [ "npm", "start" ]
