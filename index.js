const T = require('./modules/config');
const Twitter = require('./modules/twitter');
//const joke = require('./modules/getJokes');

// storing Id of accounts

const me = {
  id: 744234274065350656,
  screenName: '26th_edmund'
};

const bot = {
  id: 1148022337150885890,
  screenName: '_edmundbot'
};

const emojis = ['🙏', '🙌', '🤓', '🕺', '🤖'];

function getEmoji() {
  return emojis[Math.round(Math.random() * (emojis.length - 1))];
}

// start stream
const stream = T.stream('statuses/filter', {
  // 'edmund ekott', '@26th_edmund', stop tracking those
  track: ['@_edmundbot'],
  follow: [bot.id] // this doesn't work, supposed to follow bot's stream
});

stream.on('tweet', tweet => {
  // like any tweet with keywords
  if (tweet.favorited) {
    return;
  } else {
    Twitter.like(tweet);
  }

  // don't retweet my tweets
  if (tweet.user.id === me.id) {
    return;
  } else {
    if (tweet.is_quote_status) {
      Twitter.retweet(tweet);
      Twitter.reply(tweet, `${getEmoji()}`);
    }
    // don't retweet retweets or already retweeted tweets
    if (tweet.retweeted_status || tweet.retweeted) {
      return;
    } else {
      Twitter.retweet(tweet);
    }
  }
  // reply to all calls
  Twitter.reply(tweet, `${getEmoji()}`);

  // reply to replies
  if (tweet.in_reply_to_user_id == bot.id.toString()) {
    Twitter.like(tweet);
    Twitter.reply(tweet, `${getEmoji()}`);
  }

  // like and retweet if bot is mentioned
  if (
    tweet.entities.user_mentions.includes(
      tweet.entities.user_mentions.find(obj => obj.id == bot.id)
    )
  ) {
    Twitter.like(tweet);
    Twitter.reply(tweet, `${getEmoji()}`);
  }
});
