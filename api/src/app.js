const express = require('express');
const cors = require('cors');
const compression = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const expressWinston = require('express-winston');

const {
  redisdb,
  mongodbconfig,
  mongouri,
  logger,
  expressWinstonConfig,
} = require('./config');
const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(expressWinston.logger(expressWinstonConfig));


require('dotenv').config();

mongoose.connect(mongouri, mongodbconfig).then(()=> {
  logger.info('MongoDB Connected');
}).catch((err)=> {
  logger.error(err);
});

require('./models/command');
require('./models/user');

app.use(require('./routes/index'));

redisdb.on('connect', () => {
  logger.info('Connected to redis');
});

redisdb.on('error', (err) => {
  logger.error('Error' + err);
});

// If node process shuts down, all database connections are disconnected
process.on('SIGINT', () => {
  redisdb.quit();
  mongoose.connection.close();
  logger.error('\nNode server has been shut down. Shutting down databases');
  process.exit(1);
});

process.on('uncaughtException', (e) => {
  // Temporary replacement for when we put in the logger
  logger.error(e);
});

module.exports = app;

