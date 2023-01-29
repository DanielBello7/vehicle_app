


import App from '../server';
import http from 'http';
import DatabaseAccess from '../mysqldatabase';
import envConfig from '../config/env.config';
import log from '../config/log.config';

envConfig();

const mysql_connection = new DatabaseAccess(
  process.env.DB_HOST as string,
  process.env.DB_USER as string,
  process.env.DB_DATABASE as string,
  process.env.DB_PASSWORD as string
);

console.log('TEST', process.env.TYPE);

const serverApplication = App(mysql_connection);
const server = http.createServer(serverApplication);
const port = process.env.PORT || 7070;

serverApplication.set('port', port);

function onListening() {
  log.info('server active on port 7070');
}

function onError(error: any) {
  switch(error) {
    case 'EACCESS':
      log.error('Error getting access');
      return process.exit(1);
    case 'EADDRINUSE':
      log.error('Address in use. Change address');
      return process.exit(2);
    default:
      log.error(error);
  }
}

server.on('listening', onListening);
server.on('error', onError);

server.listen(port);