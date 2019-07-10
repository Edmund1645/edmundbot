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
  track: ['edmund ekott', '@26th_edmund', '@_edmundbot'],
  follow: [me.id.toString()] // this doesn't work, supposed to follow my stream
});

stream.on('tweet', tweet => {
  if (tweet.favorited) {
    return;
  } else {
    Twitter.like(tweet);
  }

  if (tweet.user.id === me.id) {
    if (tweet.retweeted) {
      return;
    } else {
      Twitter.retweet(tweet);
    }
  }

  Twitter.reply(tweet, `${getEmoji()}`);

  // try {
  //   if (tweet.text.toLowerCase().inludes('@_edmundbot')) {
  //     // error here too
  //     Twitter.reply(tweet, getEmoji);
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
});
