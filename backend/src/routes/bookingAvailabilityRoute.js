import tutorAvailabilityController from "../controllers/tutorAvailabilityController.js";
import { Router } from "express";

const router = Router();
const tutor = new tutorAvailabilityController();

router.get("/", (req, res) => {
    console.log(req.query.date)
    return tutor.getAvailableTutors(req.query.date)
        .then((availability) => {
            res.status(200).json(availability);
        })
        .catch((err) => {
            console.log("Error getting available tutors ", err);
            res.status(500).json({ error: "An error occurred while fetching available tutors." });
        });
});


router.post("/", (req, res) => {
    return tutor.insertBooking(req.body.booking)
        .then((availability) => {
            res.status(200).json(availability);
        })
        .catch((err) => {
            console.log("Error getting schedule ", err);
            res.status(500).json(err);
        });
});

router.delete("/booking", (req, res) => {
    return tutor.deleteBooking(req.query.id)
        .then((availability) => {
            res.status(200).json(availability);
        })
        .catch((err) => {
            console.log("Error getting schedule ", err);
            res.status(500).json(err);
        });
});


router.get("/bookings", (req, res) => {
    return tutor.getBookings(req.query.id)
        .then((availability) => {
            res.status(200).json(availability);
        })
        .catch((err) => {
            console.log("Error getting schedule ", err);
            res.status(500).json(err);
        });
});
export default router;