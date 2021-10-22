class PhotoController {
  async post(req, answr) {
    answr.json('Index');
  }
}

export default new PhotoController();
