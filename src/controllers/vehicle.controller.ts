


import { DatabaseAccessType, RequestInterface } from "../data.types";
import { Response } from 'express';

class VehicleController {
  public connection;

  constructor(connection: DatabaseAccessType) {
    this.connection = connection
  }

  get_vehicle(req: RequestInterface, res: Response) {
    return res.send('vehicle details 1');
  }
}

export default VehicleController;