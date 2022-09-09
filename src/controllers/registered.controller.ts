


import { DatabaseAccessType, RequestInterface } from "../data.types";
import { Response } from 'express';
import log from "../config/log.config";

class RegisteredController {
  public connection;

  constructor(connection: DatabaseAccessType) {
    this.connection = connection
  }

  public registered_confirmation = async (req: RequestInterface, res: Response) => {

    const id = req.params.id;

    try {

      const response = await this.connection.ConfirmRegister(id);

      if (!response.success) return res.status(400).json({msg: response.msg});

      if (!response.result.found) return res.json({msg: 'not found', found: false});

      return res.json({msg: 'found', found: true});
    }
    catch (error) {
      log.error(error);
      return res.status(500).json({msg: 'server error'});
    }
  }

  public register_details = async (req: RequestInterface, res: Response) => {

    const data = req.body;
    
    try {
      const response = await this.connection.CreateNewRegister(data);

      if (!response.success) return res.status(400).json({msg: response.msg});

      return res.json({msg: response.msg, payload: response.result, success: true});
    }
    catch(error) {
      log.error(error);
      return res.status(500).json({msg: 'server error'});
    }
  }

  public get_registered_details = (filter: "email" | "_id" | "license") => {
    return async (req: RequestInterface, res: Response) => {
      try {

        const search_item = req.params.search;

        const response = await this.connection.GetRegisterData(filter, search_item);
  
        if (!response.success) return res.status(400).json({msg: response.msg});
  
        return res.json({msg: response.msg, payload: response.result});

      } 
      catch (error) {
        log.error(error);
        return res.status(500).json({msg: 'Server Error'});
      }
    }
  }
}

export default RegisteredController;