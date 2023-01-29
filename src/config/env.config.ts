


import dotenv from 'dotenv';
import path from 'path';

const envPath = process.env.NODE_ENV === 'dev' ? 'dev.env' : 'prod.env';
const path_url = path.join(__dirname, `../../env/${envPath}`);

export default () => dotenv.config({path: path_url});