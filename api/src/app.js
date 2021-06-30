const express = require('express');
const cors = require('cors');
const compression = require('express');
const redis = require('redis');

const {port, dbConfig} = require('./config');
const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

const redisdb = redis.createClient(dbConfig);

redisdb.on('error', (err) => {
  console.log('Error' + err);
});

process.on('uncaughtException', (e) => {
  // Temporary replacement for when we put in the logger
  console.log(e);
});

app.listen(port, ()=> {
  console.log(`server running on port : ${port}`);
}).on('error', (e) => console.log(e));

// If node process shuts down, all database connections are disconnected
process.on('SIGINT', () => {
  redisdb.quit();
  // Fill in later
});
