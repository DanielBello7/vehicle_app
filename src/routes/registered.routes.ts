


import { ValidateRequest } from "../middlewares/errorhandler";
import { DatabaseAccessType } from '../data.types';
import { check } from "express-validator";
import express from 'express';
import RegisteredController from '../controllers/registered.controller';
const router = express.Router();

export default (connection: DatabaseAccessType) => {

  const controller = new RegisteredController(connection);

  router.post('/', 
  [
    check('firstname').exists().trim().isString().toLowerCase(),
    check('lastname').exists().trim().isString().toLowerCase(),
    check('email').exists().trim().isString().toLowerCase(),
    check('license').exists().trim().isString().toLowerCase(),
    check('registeredBy').exists().trim().isString(),
    check('dateCreated').exists().trim().isString()
  ], 
  ValidateRequest, 
  controller.register_details);

  router.get('/confirmation/:id', controller.registered_confirmation);

  router.get('/details/email/:search', controller.get_registered_details("email"));

  router.get('/details/license/:search', controller.get_registered_details("license"));

  router.get('/details/id/:search', controller.get_registered_details("_id"));

  return router;
}