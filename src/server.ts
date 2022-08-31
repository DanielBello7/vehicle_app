


import express, { Application } from 'express';
import { DatabaseAccessType } from './data.types';
import { HandlePageNotFound, HandleIconError } from './middlewares/errorhandler';
import cors from 'cors';
import routes from './routes/index.routes';
import compression from 'compression';
import upload from 'express-fileupload';
import path from 'path';
import ExpressSecret from './config/secret.config';
import passport from 'passport';
import SessionVisits from './middlewares/sessionVisits';
import initialize from './middlewares/passport';
import session from 'express-session';


function App(connection: DatabaseAccessType) {
  const app: Application = express();

  initialize(passport, connection);

  app.use(cors());
  app.use(compression());
  app.use(express.json());
  app.use(upload());
  app.use(express.static(path.join(__dirname, "static")));
  app.use(express.urlencoded({extended: true}));
  app.use(ExpressSecret);

  app.use(session({
    resave: true,
    secret: process.env.SECRET as string,
    saveUninitialized: true,
    cookie: {
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  }));
  app.use(HandleIconError);
  app.use(SessionVisits);

  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use('/api/v1', routes(connection));
  app.use(HandlePageNotFound);

  return app;
}

export default App;