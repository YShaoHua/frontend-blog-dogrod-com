FROM keymetrics/pm2:latest-alpine

# Bundle APP files
RUN mkdir -p /home/service
WORKDIR /home/service
COPY . /home/service

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

# Show current folder structure in logs
RUN ls

RUN npm run deploy

EXPOSE 4000
CMD ["pm2-docker", "start", "pm2.json"]