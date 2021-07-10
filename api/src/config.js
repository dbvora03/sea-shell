const redis = require('redis');

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

const mongodbconfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  environment, port, redisdb, mongodbconfig, mongouri, JWT_SECRET, BCRYPTHASH,
};
