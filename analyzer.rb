require "vertx"
require "set"
include Vertx

STOPWORDS = Set.new(FileSystem.read_file_as_buffer_sync('stopwords.txt').to_s.split("\n"))

def words(tweet)
  tweet.downcase.split.map { |w| w.gsub(/^[\(\"']+/, '').gsub(/[.,:\)\"']+$/, '') }
end

def filter_interesting(words)
  words.select do |word|
    word != 'guitar' && word.size >= 3 && !STOPWORDS.include?(word) && /^(http|@)/ !~ word
  end
end

EventBus.register_handler 'tweets' do |tweet|
  filter_interesting(words(tweet.body)).each do |word|
    Vertx.set_timer rand(5000) do
      EventBus.publish 'tweetWords', word: word
    end
  end
end
