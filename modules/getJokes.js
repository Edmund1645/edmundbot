const fetch = require('node-fetch');
const Twitter = require('./twitter');
let pastJokes = []; // to prevent many duplicate jokes
const categories = ['Programming', 'Miscellaneous'];
function getCategory() {
  const index = Math.round(Math.random() * (categories.length - 1));
  return categories[index];
}

function getJoke() {
  const url = `https://sv443.net/jokeapi/category/${getCategory()}?blacklistFlags=nsfw,religious,political`;
  fetch(url)
    .catch(err => console.log(err))
    .then(res => res.json())
    .then(joke => {
      const category =
        joke.category == 'Programming'
          ? '#programing #programmingJokes #techhumor'
          : '#jokes #funny';
      function tweetJoke() {
        if ((joke.type = 'single')) {
          Twitter.tweet(`${joke.joke}

        ${category}`);
        } else {
          Twitter.tweet(`${joke.setup}

        ${joke.delivery}
        ${category}`);
        }
      }
      if (pastJokes.includes(joke.id)) {
        if (pastJokes.length >= 50) {
          pastJokes.length = 0;
        }
        getJoke();
      } else {
        tweetJoke();
        pastJokes.push(joke.id);
        return;
      }
    });
}
getJoke();
