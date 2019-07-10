const fetch = require('node-fetch');
module.exports = {
  categories: ['Programming', 'Miscellaneous'],
  getCategory() {
    const index = Math.round(Math.random() * (this.categories.length - 1));
    return this.categories[index];
  },
  async getJoke() {
    const url = `https://sv443.net/jokeapi/category/${this.getCategory()}?blacklistFlags=nsfw,religious,political`;
    const data = await fetch(url)
    return data;
  }
};
