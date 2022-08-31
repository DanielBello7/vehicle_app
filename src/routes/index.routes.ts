


import { DatabaseAccessType } from '../data.types';
import express from 'express';
import auth from './auth.routes';
import vehicle from './vehicle.routes';

const router = express.Router();

export default (connection: DatabaseAccessType) => {

  router.use('/auth', auth(connection));

  router.use('/vehicle', vehicle(connection));

  return router;
}