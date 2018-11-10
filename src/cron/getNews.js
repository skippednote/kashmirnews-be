const CronJob = require('cron').CronJob;
const newsCache = require('../cache/newsCache');
const news = require('../newspapers');
const { PRODUCTION } = require('../utils');

const cronTime = PRODUCTION ? '*/15 * * * *' : '* * * * *'
const getNews = new CronJob({
  cronTime,
  onTick: async () => {
    console.log('CronJob: Started')
    newsCache.set('news', await news());
  },
  runOnInit: true
});

module.exports = getNews;
