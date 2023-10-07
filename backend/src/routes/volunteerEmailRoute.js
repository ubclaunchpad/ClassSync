import { Router } from "express";
import sendEmail from "../controllers/volunteerEmailController.js"
const router = Router();



router.post("/send-email",sendEmail );

export default router;