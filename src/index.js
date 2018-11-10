const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const getNews = require('./cron/getNews');
const newsCache = require('./cache/newsCache');
const {PRODUCTION, PORT} = require('./utils');

const app = express();
app.use(helmet());
app.use(cors({
  origin: PRODUCTION ? 'https://kn.bassam.co' : 'http://localhost:3000'
}));
app.disable('x-powered-by');

getNews.start();

app.get('/favicon.ico', (_req, res) => res.status(204));
app.get('/news', async (_req, res) => {
  res.send(newsCache.get('news'));
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
