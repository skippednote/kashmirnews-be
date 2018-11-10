const CronJob = require('cron').CronJob;
const newsCache = require('../cache/newsCache');
const news = require('../newspapers');

const getNews = new CronJob({
  cronTime: '* * * * *',
  onTick: async () => {
    newsCache.set('news', await news());
  },
});

module.exports = getNews;
