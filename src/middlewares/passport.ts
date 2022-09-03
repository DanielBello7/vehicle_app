


import log from '../config/log.config';
import GoogleAuth from 'passport-google-oauth20';
import LocalAuth from 'passport-local';
import { PassportStatic } from 'passport';
import { DatabaseAccessType } from '../data.types';

const GoogleStrategy = GoogleAuth.Strategy;
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


  const google = new GoogleStrategy({
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: `${process.env.ADDRESS}/api/v1/auth/google-callback`
  }, 
  async (assTkn, refTkn, profile, done) => {
    
    const user_login_data = {
      _id: profile.id,
      email: profile.emails ? profile.emails[0].value : null,
      firstname: profile.name?.givenName.toLocaleLowerCase(),
      lastname: profile.name?.familyName.toLocaleLowerCase()
    }

    return done(null, user_login_data);
  });
  
  passport.use(authenticate_user);

  passport.use(google);

  passport.serializeUser((user: any, done: any) => done(null, user));

  passport.deserializeUser((user: any, done: any) => done(null, user));
}

export default initialize;