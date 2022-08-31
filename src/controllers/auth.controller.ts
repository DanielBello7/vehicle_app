


import { DatabaseAccessType, NewUserType, RequestInterface } from '../data.types';
import { Response } from 'express';
import log from '../config/log.config';

class AuthController {
  private connection;

  constructor(connection: DatabaseAccessType) {
    this.connection = connection;
  }

  public create_account = async (req: RequestInterface, res: Response) => {
    try {
      const new_user_data: NewUserType = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      }

      const response = await this.connection.CreateUser(new_user_data);

      if (!response.success) return res.status(400).json({msg: response.msg});

      return res.json({msg: response.msg, success: 1, payload: response.result});
    }
    catch(error) {
      log.error(error);
      return res.status(500).json({msg: 'Error'});
    }
  }

  public login_callback = async (req: RequestInterface, res: Response) => {
    return res.json({msg: 'logged in', payload: req.user, success: true});
  }
}

export default AuthController;