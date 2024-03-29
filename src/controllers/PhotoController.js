import multer from 'multer';

import multerConfig from '../config/multerConfig';
import Photo from '../models/Photo';

const upload = multer(multerConfig).single('archive');

class PhotoController {
  store(req, answr) {
    return upload(req, answr, async (error) => {
      if (error) {
        return answr.status(400).json({
          error: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        const photo = await Photo.create({ originalname, filename, student_id });
        return answr.json(photo);
      } catch (e) {
        return answr.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

export default new PhotoController();
