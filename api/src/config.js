const redis = require('redis');
const winston = require('winston');

const {
  REDISHOST, REDISPASSWORD, REDISPORT, MONGOURI, JWTSECRET, HASH,
} = require('../key');

const JWT_SECRET = process.env.JWT_SECRET || JWTSECRET;
const environment = process.env.NODE_ENV;
const port = process.env.PORT || 8080;
const mongouri = process.env.MONGOURI || MONGOURI;
const BCRYPTHASH = process.env.BCRYPTHASH || HASH;

const dbConfig = {
  host: process.env.REDISHOST || REDISHOST,
  port: process.env.REDISPORT || REDISPORT,
  password: process.env.REDISPASSWORD || REDISPASSWORD,
};

const redisdb = redis.createClient(dbConfig);
const consoleTransport = new winston.transports.Console();
const fileTransport = new winston.transports.File({
  filename: './logs/general.log',
  json: false,
  timestamp: true,
  maxFiles: '2d',
});

const httpfileTransport = new winston.transports.File({
  filename: './logs/http.log',
  json: false,
  timestamp: true,
  maxFiles: '2d',
});

const myWinstonOptions = {
  transports: [
    consoleTransport,
    fileTransport,
  ],
};

// eslint-disable-next-line new-cap
const logger = new winston.createLogger(myWinstonOptions);

const expressWinstonConfig = {
  transports: [
    consoleTransport,
    httpfileTransport,
  ],
  format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
  ignoreRoute: function(req, res) {
    return false;
  },
};

const mongodbconfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  environment,
  port,
  redisdb,
  mongodbconfig,
  mongouri,
  JWT_SECRET,
  BCRYPTHASH,
  logger,
  expressWinstonConfig,
};
