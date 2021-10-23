class PhotoController {
  async store(req, answr) {
    answr.json(req.file);
  }
}

export default new PhotoController();
