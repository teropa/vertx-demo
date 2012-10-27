require "vertx"

Vertx::EventBus.register_handler 'tweets' do |tweet|
  puts tweet.body
end
