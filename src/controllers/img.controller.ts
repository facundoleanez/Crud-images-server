import { json } from 'envalid';
import { NextFunction, Response, Request } from 'express';
import fs from 'fs';
import path from 'path';

interface RequestCon extends Request {
  getConnection?: ((callback: (err: mysql.MysqlError, connection: any) => void) => void) | undefined;
}

class ImgController {
  public getAllImgs = async (req: RequestCon, res: Response, next: NextFunction) => {
    try {
      req.getConnection((err, connection) => {
        if (err) return next(err);
        connection.query('SELECT * FROM image', [], (erro, rows) => {
          if (erro) return console.log(erro);
          res.status(200).json(rows);
        });
      });
    } catch (error) {
      next(error);
      console.log('src/controllers/img.controller ImgController.getAllImgs');
    }
  };

  public saveImg = async (req: RequestCon, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.getConnection((err, connection) => {
        if (err) return next(err);
        const type = req.file.mimetype;
        const name = req.file.originalname;
        const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename));
        connection.query('INSERT INTO image set ?', [{ type, name, data }], (erro, rows) => {
          if (erro) return console.log(erro);
          res.send('image saved');
        });
      });
      res.status(200).json({ hola: 'hola' });
    } catch (error) {
      next(error);
    }
  };
}

export default ImgController;
