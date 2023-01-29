


import { DatabaseAccessType } from '../data.types';
import { PassportStatic } from 'passport';
import log from '../config/log.config';
import LocalAuth from 'passport-local';

const LocalStrategy = LocalAuth.Strategy;

function initialize(passport: PassportStatic, connection: DatabaseAccessType) {
  
  const authenticate_user = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, 
  async (email, password, done) => {
    try {
      const response = await connection.GetUser(email);
      if (!response.success) return done(null, false, {message: 'user not found'});
      if (response.result.password === password) return done(null, response.result);
      return done(null, false, {message: 'invalid credentials'});
    }
    catch (error) {
      log.error(error);
      return done(error);
    }
  });
  
  passport.use('local', authenticate_user);
  passport.serializeUser((user: any, done: any) => done(null, user));
  passport.deserializeUser((user: any, done: any) => done(null, user));
}

export default initialize;