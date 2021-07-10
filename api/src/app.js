const express = require('express');
const cors = require('cors');
const compression = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const {port, redisdb, mongodbconfig, mongouri} = require('./config');
const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());


require('dotenv').config();

mongoose.connect(mongouri, mongodbconfig).then(()=> {
  console.log('MongoDB Connected');
}).catch((err)=> {
  console.log(err);
});

require('./models/command');
require('./models/user');

app.use(require('./routes'));

redisdb.on('connect', () => {
  console.log('Connected to redis');
});

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
