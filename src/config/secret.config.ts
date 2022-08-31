


import { Response, NextFunction } from 'express';
import { RequestInterface } from '../data.types';

function ExpressSecret(req: RequestInterface, res: Response, next: NextFunction) {
  req.secret = process.env.SECRET;
  return next();
}

export default ExpressSecret;