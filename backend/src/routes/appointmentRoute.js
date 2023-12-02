import { Router } from "express";
import appointmentControllers from "../controllers/appointmentController.js"

const router = Router();



router.put("/updated-appointment",appointmentControllers.updateAppointment );

export default router;