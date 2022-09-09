


import mysql2 from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseAccessType, DatabaseResponse, NewRegisterType, NewUserType } from './data.types';

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

  public ConfirmRegister = async (id: string): Promise<DatabaseResponse> => {
    
    const [request]: any = await this.conn.promise().query(
      'SELECT * FROM registered WHERE _id = ?', 
      [id]
    );

    if (request.length <= 0) 
      return {msg: 'not found', result: {found: false}, success: true}

    return {msg: 'found', result: {found: true}, success: true};
  }

  public GetRegisterData = async (filter: 'email' | '_id' | 'license', data: string): Promise<DatabaseResponse> => {

    const [request] = await this.conn.promise().query(
      `SELECT * from registered WHERE ${filter} = ?`, [data]
    );

    return {msg: "results", result: request, success: true}
  } 

  public CreateNewRegister = async (data: NewRegisterType): Promise<DatabaseResponse> => {

    const _id = uuidv4();
    const firstname = data.firstname;
    const lastname = data.lastname;
    const email = data.email;
    const license = data.license;
    const registeredBy = data.registeredBy;
    const date = data.dateCreated;
    const img = null;
    const isVerified = false;

    const [confirm]: any = await this.conn.promise().query(
      'SELECT * FROM registered WHERE license = ?', 
      [license]
    );

    if (confirm.length > 0) 
      return {msg: 'license already registered', result: confirm, success: true}


    const [request]: any = await this.conn.promise().query(
      'INSERT INTO registered (_id, firstname, lastname, email, license, registeredBy, dateCreated, img, isVerified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [_id, firstname, lastname, email, license, registeredBy, date, img, isVerified]
    );

    if (request.affectedRows <= 0) return {msg: 'not created', result: request, success: false}

    const user = {
      _id,
      firstname,
      lastname,
      email,
      license,
      registeredBy,
      dateCreated: date,
      img,
      isVerified
    }

    return {msg: 'created', result: user, success: true}
  }
}

export default DatabaseAccess;