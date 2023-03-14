import ImgController from '@/controllers/img.controller';
import { Routes } from '@/interfaces/routes.interface';
import imgMiddleware from '@/middlewares/img.middleware';
import fileUpload from '@/middlewares/img.middleware';
import { Router } from 'express';

class ImageRoute implements Routes {
  public path?: string = '/img';
  public router: Router = Router();
  public imgController = new ImgController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, imgMiddleware(), this.imgController.saveImg);
  }
}

export default ImageRoute;
