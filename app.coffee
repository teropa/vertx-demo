vertx = require 'vertx'

vertx.deployVerticle 'tweets.coffee'
vertx.deployVerticle 'words.rb'

vertx.deployModule 'vertx.web-server-v1.0'
  port: 8080
  bridge: true
  outbound_permitted: [
    {address: 'tweetWords'}
  ]
