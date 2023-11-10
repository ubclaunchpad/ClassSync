import { Router } from "express";
import bookAppointment from "../controllers/appointmentController.js"
import updateAppointment from "../controllers/appointmentController.js"
const router = Router();



router.put("/updated-appointment",updateAppointment );

export default router;