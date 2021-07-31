const app = require('./app');

const {
  port,
  logger,
} = require('./config');

app.listen(port, ()=> {
  logger.info(`server running on port : ${port}`);
}).on('error', (e) => logger.error(e));
