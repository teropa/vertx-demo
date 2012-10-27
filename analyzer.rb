require "vertx"

Vertx::EventBus.register_handler 'tweets' do |tweet|
  tweet.body.downcase.gsub(/\W/, ' ').split.each do |word|
    Vertx::EventBus.publish 'tweetWords', word
  end
end
