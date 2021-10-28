import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Shoud not exist.
// router.get('/', loginRequired, userController.index); // List all users
// router.get('/:id', loginRequired, userController.show); // List a single user

// router.post('/', userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
