const cluster = require('cluster');
const {logger} = require('./config.js');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    logger.fatal('worker ' + worker.process.pid + ' died');
  });
} else {
  require('./app.js');
}


