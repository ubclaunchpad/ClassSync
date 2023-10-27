import { Router } from "express";
import tutorAvailabilityController from "../controllers/tutorAvailabilityController.js";
const router = Router();
const tutor = new tutorAvailabilityController();


router.get("/pingcheck", (_, res) => {
    res.send("pong");
});

router.post("/", (req, res) => {
    const userID = req.body.userID;
    const weeks = req.body.weeks;
    const availability = req.body.availability;

    tutor.setAvailability(userID, weeks, availability).then(() => {
        res.status(200);
    }).catch((err) => {
        res.status(500).send("Availability not added");
    });
});

export default router;