import express from 'express';
import { AdminController } from '../controllers/admin.controller.js';

const router = express.Router();
const adminController = new AdminController();

router.post('/create-superadmin', adminController.createSuperadmin.bind(adminController))
    .post('/create-admin', adminController.createAdmin.bind(adminController))
    .post('/signin', adminController.signinAdmin.bind(adminController))
    .post('/confirm-signin', adminController.confirmSigninAdmin.bind(adminController))
    .get('/', adminController.getAllAdmins.bind(adminController))
    .get('/:id', adminController.getAdminById.bind(adminController))
    .put('/:id', adminController.updateAdminById.bind(adminController))
    .delete('/:id', adminController.deleteAdminById.bind(adminController))

export default router;
