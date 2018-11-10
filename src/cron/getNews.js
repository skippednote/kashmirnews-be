const CronJob = require('cron').CronJob;
const newsCache = require('../cache/newsCache');
const news = require('../newspapers');

const getNews = new CronJob({
  cronTime: '*/15 * * * *',
  onTick: async () => {
    newsCache.set('news', await news());
  },
});

module.exports = getNews;
