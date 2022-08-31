


import dotenv from 'dotenv';
import path from 'path';

const envPath = process.env.NODE_ENV === 'dev' ? 'dev.env' : 'prod.env';

export default () => dotenv.config({
  path: path.join(__dirname, `../env/${envPath}`)
});