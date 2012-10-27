vertx = require "vertx"

auth = vertx.env["TWITTER_BASIC_AUTH"]
eb = vertx.eventBus
client = vertx.createHttpClient().setHost("stream.twitter.com").setPort(443).setSSL(true).setTrustAll(true)

req = client.post "/1.1/statuses/filter.json", (res) ->
  data = new vertx.Buffer()
  res.dataHandler (buffer) ->
    data.appendBuffer(buffer)
    try
      eb.publish 'tweets', JSON.parse(data.toString()).text
      data = new vertx.Buffer()
    catch e


req.putHeader "Content-Type", "application/x-www-form-urlencoded"
req.putHeader "Authorization", "Basic #{auth}"
req.end "track=dogs"
