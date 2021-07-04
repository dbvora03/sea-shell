const environment = process.env.NODE_ENV;
const port = process.env.PORT || 8080;

// Dont worry, these are env values for dev.
// Actual production values won't be used.
const dbConfig = {
  host: 'redis-10091.c60.us-west-1-2.ec2.cloud.redislabs.com',
  port: 10091,
  password: 'U3ZfgofQel3HwfJ6RvN8FKTBb5TBN02B',

};

const mongodbconfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {environment, port, dbConfig, mongodbconfig};
