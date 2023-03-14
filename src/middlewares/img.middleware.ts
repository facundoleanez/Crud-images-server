import multer from 'multer';
import path from 'path';

const imgMiddleware = () => {
  const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  });

  const fileUpload = multer({
    storage: diskstorage,
  }).single('image');
  return fileUpload;
};

export default imgMiddleware;
