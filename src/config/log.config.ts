


import bunyan from 'bunyan';

const log = bunyan.createLogger({name: 'prod', level: 'debug'});

export default log;