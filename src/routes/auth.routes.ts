


import { DatabaseAccessType } from '../data.types';
import { ValidateRequest } from '../middlewares/errorhandler';
import { check } from 'express-validator';
import express from 'express';
import AuthController from '../controllers/auth.controller';
import passport from 'passport';

const router = express.Router();

export default (connection: DatabaseAccessType) => {

  const authorization = new AuthController(connection);

  router.post('/', 
  [
    check('firstname').exists().trim().escape().isString(),
    check('lastname').exists().trim().escape().isString(),
    check('email').exists().trim().escape().isEmail(),
    check('password').exists().trim().escape().isString()
  ], 
  ValidateRequest, 
  authorization.create_account);

  router.post('/login/local', 
  [
    check('email').trim().isEmail().exists(),
    check('password').trim().exists().isString()
  ],
  ValidateRequest,
  passport.authenticate('local'),
  authorization.login_callback);

  router.get('/users', authorization.get_all_users);

  router.get('/login/google', 
  passport.authenticate('google', {scope: ['profile', 'email']}));

  router.get('/login/google/callback', 
  passport.authenticate('google'), 
  authorization.login_callback);

  return router;
}