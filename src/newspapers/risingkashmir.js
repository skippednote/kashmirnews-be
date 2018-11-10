const axios = require('axios');
const nanoid = require('nanoid');

const SOURCE = 'Rising Kashmir';
const BASE_URL = 'http://www.risingkashmir.com/';

function formatNews(news) {
  const newsItems = news.result.reduce(
    (acc, { title, news_url }) => [
      ...acc,
      { title, url: `${BASE_URL}news/${news_url}`, id: nanoid() },
    ],
    []
  );
  return { source: SOURCE, newsItems };
}

async function getNews() {
  try {
    const { data: rawNews } = await axios.post(
      `${BASE_URL}home/get_newsupdates`
    );
    return formatNews(rawNews);
  } catch (err) {
    console.error(err);
  }
}

module.exports = getNews;
