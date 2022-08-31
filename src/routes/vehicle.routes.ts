


import express from 'express';
import { DatabaseAccessType } from '../data.types';
import VehicleController from '../controllers/vehicle.controller';
const router = express.Router();

export default (connection: DatabaseAccessType) => {

  const controller = new VehicleController(connection);

  router.get('/', controller.get_vehicle);

  return router;
}