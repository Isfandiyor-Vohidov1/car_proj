import Router from 'express';
import { UserController } from '../controllers/user.controller.js';

const router = Router()
const controller = new UserController();

router.post('/', controller.createUser)
    .get('/', controller.getAllUsers)
    .get('/:id', controller.getUserById)
    .patch('/:id', controller.updateUserById)
    .delete('/:id', controller.deleteUserById);

export default router;
