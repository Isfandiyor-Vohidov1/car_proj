import { Router } from "express";
import { CarController } from "../controllers/car.controller.js";

const router = Router();
const controller = new CarController();

router.post("/", controller.createCar);
router.get("/", controller.getAllCars);
router.get("/:id", controller.getCarById);
router.patch("/:id", controller.updateCarById);
router.delete("/:id", controller.deleteCarById);

export default router;
