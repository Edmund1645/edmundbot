const Twit = require('twit');
const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

T.post('statuses/update', { status: 'I don show like shola. ;) ' }, function(
  err,
  data,
  response
) {
  //console.log(data);
});
