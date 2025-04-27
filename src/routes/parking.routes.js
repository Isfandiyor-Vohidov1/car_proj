import { Router } from "express";
import { parkingController } from "../controllers/parking.controller.js";

const router = Router();
const controller = new parkingController();

router.post('/', controller.createParking)
    .get('/', controller.getAllParks)
    .get('/:id', controller.getParkById)
    .patch('/:id', controller.updateParkById)
    .delete('/:id', controller.deleteParkById);

export default router;
