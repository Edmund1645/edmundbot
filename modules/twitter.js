const T = require('./config');

module.exports = {
  tweet: tweet => {
    T.post('statuses/update', { status: tweet });
  },
  retweet: tweet => {
    T.post('statuses/retweet/:id', { id: tweet.id_str });
  },
  reply: (tweet, reply) => {
    T.post('statuses/update', {
      status: `@${tweet.user.screen_name} ${reply}`,
      in_reply_to_status_id: tweet.is_quote_status
        ? tweet.quoted_status_id_str
        : tweet.id_str
    });
  },
  like: tweet => {
    T.post('favorites/create', { id: tweet.id_str });
  }
};
