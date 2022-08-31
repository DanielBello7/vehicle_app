


import { NextFunction, Response } from "express";
import { RequestInterface } from "../data.types";
import log from "../config/log.config";

export default function SessionVisits(req: RequestInterface, res: Response, next: NextFunction) {
  if (req.session.visits) req.session.visits++;
  else req.session.visits = 1;
  req.session.visits % 5 === 0 ? log.info(req.session) : null;
  return next();
}