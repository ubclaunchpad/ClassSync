import { Router } from "express";
import adminController from "../controllers/adminController.js";
const router = Router();
const admin = new adminController()

router.get("/pingcheck", (_, res) => {
    res.send("pong");
});

router.get("/:id/availability", (req, res) => {
    admin.getAvailability(req.params.id).then(r => res.status(200).json(r)).catch(e=>res.status(e.status).json(e))
})