# SQL Syntax

## Getting data

Use either

- const res = this.conn.execute('SELECT \* FROM users', (err: any, res: any) => {
  console.log(res)
  });

- const [rows] = await this.conn.promise().query('SELECT \* FROM users');
