const axios = require('axios');
const nanoid = require('nanoid');
const Xray = require('x-ray');

const SOURCE = 'Greater Kashmir';
const BASE_URL = 'https://www.greaterkashmir.com';

const x = Xray({
  filters: {
    prefix(url) {
      return typeof url === 'string' ? `${BASE_URL}${url}` : url;
    },
  },
});

function parseNews(html) {
  return new Promise((resolve, reject) => {
    x(
      html,
      '#ctl00_ContentPlaceHolder1_mostRead1_dvMostPopular .latestNews li',
      [
        {
          title: 'a',
          url: 'a@href | prefix',
        },
      ]
    )((err, newsItems) => {
      if (err) {
        reject(err);
      }
      resolve(newsItems);
    });
  });
}

function formatNews(news) {
  const newsItems = news.reduce(
    (acc, newsItem) => [...acc, { ...newsItem, id: nanoid() }],
    []
  );
  return { source: SOURCE, newsItems };
}

async function getNews() {
  try {
    const { data: html } = await axios.get(BASE_URL);
    const rawNews = await parseNews(html);
    return formatNews(rawNews);
  } catch (err) {
    console.error(err);
  }
}

module.exports = getNews;
