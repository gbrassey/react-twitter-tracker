var Tweet = require('../models/Tweet'),
    Semantria = require('semantria-node'),
    config = require('../config').semantria;

var SemantriaSession = new Semantria.Session(config.consumer_key, config.consumer_secret, 'reactApp');

module.exports = function(stream, io){

  // When tweets get sent our way ...
  stream.on('data', function(data) {

    buildTweet(null, data, function (err, tweet) {

      if (!err) {
        // If everything is cool, socket.io emits the tweet.
        io.emit('tweet', tweet);
      }

    });

  });

  stream.on('error', function (err) {
    console.error(err);
  });

};

function buildTweet (err, data, callback) {

  // Construct a new tweet object
  var tweet = {
    twid: data['id'],
    active: false,
    author: data['user']['name'],
    avatar: data['user']['profile_image_url'],
    body: data['text'],
    date: data['created_at'],
    screenname: data['user']['screen_name']
  };

  getSentiment(null, tweet, callback);
}

function getSentiment (err, tweet, callback) {

  var result = SemantriaSession.queueDocument({
    id: tweet.twid,
    text: tweet.body
  });

  if (result === 202) {
    var data = SemantriaSession.getDocument(tweet.twid);

    tweet.sentimentScore = data.sentiment_score;
    tweet.sentimentText = data.sentiment_polarity;
  }

  saveTweet(null, tweet, callback);
}

function saveTweet (err, tweet, callback) {

  // Create a new model instance with our object
  var tweetEntry = new Tweet(tweet);

  // Save 'er to the database
  tweetEntry.save(function (err) {
    callback(err, tweet);
  });
}
