import { Router } from "express";
import adminController from "../controllers/adminController.js";
import AdminDashController from "../controllers/adminDashController.js";
const router = Router();
const admin = new adminController()

router.get("/pingcheck", (_, res) => {
    res.send("pong");
});

router.get("/:id/availability", (req, res) => {
    return admin.getAvailability(req.params.id).then((result) =>
        res.status(200).json(result)
    ).catch((err) => {
        console.log(err);
        res.status(500).send("Get availability failed");
    });
})

router.get("/dashboard", (_, res) => {
    let adminDash = new AdminDashController()
    return adminDash.getClassHistory().then((result) =>
        res.status(200).json(result)
    ).catch((err) => {
        console.log(err);
        res.status(500).send("Get dashboard failed");
    });
})

export default router