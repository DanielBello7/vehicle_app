



import { Response, Request, NextFunction } from "express";
import { validationResult } from 'express-validator';

function HandleIconError(req: Request, res: Response, next: NextFunction) {
  if (req.url === '/favicon.ico') return res.end();
  return next();
}

function HandlePageNotFound(req: Request, res: Response) {
  return res.status(404).json({msg: 'Page not found'});
}

function HandleGeneralError(req: Request, res: Response) {
  const errMsg = req.params.errorMsg;
  return res.status(400).json({msg: errMsg ? errMsg : 'error'});
}

function ValidateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({msg: errors.array()});
  return next();
}

export { 
  HandleIconError,
  HandlePageNotFound,
  HandleGeneralError,
  ValidateRequest
}