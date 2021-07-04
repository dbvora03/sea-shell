const express = require('express');
const cors = require('cors');
const compression = require('express');
const redis = require('redis');
const mongoose = require('mongoose');

const {port, dbConfig, mongodbconfig} = require('./config');
const app = express();

app.use(express.json());
app.use(compression());
app.use(cors());

const MONGOURI = require('../key');

mongoose.connect(MONGOURI, mongodbconfig).then(()=> {
  console.log('MongoDB Connected');
}).catch((err)=> {
  console.log(err);
});


const redisdb = redis.createClient(dbConfig);

redisdb.on('error', (err) => {
  console.log('Error' + err);
});


app.listen(port, ()=> {
  console.log(`server running on port : ${port}`);
}).on('error', (e) => console.log(e));


// If node process shuts down, all database connections are disconnected
process.on('SIGINT', () => {
  redisdb.quit();
  mongoose.connection.close();
  console.log('\nNode server has been shut down. Shutting down databases');
  process.exit(1);
});

process.on('uncaughtException', (e) => {
  // Temporary replacement for when we put in the logger
  console.log(e);
});
