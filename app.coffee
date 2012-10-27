vertx = require 'vertx'

vertx.deployVerticle 'tweets.coffee'
vertx.deployVerticle 'analyzer.rb'
