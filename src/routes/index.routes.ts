


import { DatabaseAccessType } from '../data.types';
import express from 'express';
import auth from './auth.routes';
import registered from './registered.routes';

const router = express.Router();

export default (connection: DatabaseAccessType) => {

  router.use('/auth', auth(connection));

  router.use('/registered', registered(connection));

  return router;
}