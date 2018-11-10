const greaterkashmir = require('./greaterkashmir');
const risingkashmir = require('./risingkashmir');

async function news() {
  try {
    const news = await Promise.all([greaterkashmir(), risingkashmir()]);
    return news;
  } catch (err) {
    console.error(news);
  }
}

module.exports = news;
