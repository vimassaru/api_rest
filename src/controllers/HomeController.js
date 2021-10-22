class HomeController {
  async index(req, answr) {
    answr.json('Index');
  }
}

export default new HomeController();
