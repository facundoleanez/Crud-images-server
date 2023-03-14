import myConn from 'express-myconnection';
import mysql from 'mysql';

export const myConnection = () => {
  return myConn(
    mysql,
    {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'matedevfacuseba',
      database: 'images',
    },
    'single',
  );
};
