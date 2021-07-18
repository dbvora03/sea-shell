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
  // change this line to Your Node.js app entry point.
  require('./app.js');
}
