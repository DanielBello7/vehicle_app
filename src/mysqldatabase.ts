


import mysql2 from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseAccessType, DatabaseResponse, NewUserType } from './data.types';

class DatabaseAccess implements DatabaseAccessType {
  private conn;

  constructor(host: string, user: string, db: string, pass: string) {
    this.conn = mysql2.createPool({
      host: host,
      user: user,
      database: db,
      password: pass
    });
  }

  public GetUsers = async (): Promise<DatabaseResponse> => {
    const [rows] = await this.conn.promise().query('SELECT * FROM users');
    return {msg: 'Results', result: rows, success: true}
  }

  public CreateUser = async (data: NewUserType): Promise<DatabaseResponse> => {
    const new_id = uuidv4();

    const [confirmation]: any = await this.conn.promise().query(
      `SELECT * FROM users WHERE email = ?`, 
      [data.email]
    );

    if (confirmation.length > 0) return {msg: 'User exists', result: null, success: false}

    const response = await this.conn.promise().query(
      `INSERT INTO users (_id, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)`, 
      [new_id, data.firstname, data.lastname, data.email, data.password]
    );

    const result = {...data, _id: new_id}

    return {msg: 'User created', result: {user: result}, success: true}
  }

  public GetUser = async (email: string): Promise<DatabaseResponse> => {
    const [response]: any = await this.conn.promise().query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );

    if (response.length <= 0) return {msg: 'not found', result: null, success: false}

    return {msg: 'User found', result: response[0], success: true}
  }
}

export default DatabaseAccess;