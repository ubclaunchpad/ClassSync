import tutorAvailabilityController from "../controllers/tutorAvailabilityController.js";
import { Router } from "express";

const router = Router();
const tutor = new tutorAvailabilityController();

router.get("/", (req, res) => {
    return tutor.getAvailableTutors(req.query.date, req.query.course_id)
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


router.post("/remove", (req, res) => {
    return tutor.removeAvailability(req.body.tutor_id, req.body.start_date, req.body.end_date,
        req.body.day, req.body.times)

        .then((availability) => {
            res.status(200).json(availability);
        })
        .catch((err) => {
            console.log("Error getting schedule ", err);
            res.status(500).json(err);
        });
});


router.post("/clear", (req, res) => {
    return tutor.clearAvailability(req.body.tutor_id, req.body.start_date)

        .then((availability) => {
            res.status(200).json(availability);
        })
        .catch((err) => {
            console.log("Error getting schedule ", err);
            res.status(500).json(err);
        });
});
router.post("/reset", (req, res) => {
    return tutor.resetAvailability(req.body.tutor_id, req.body.start_date, req.body.end_date)
        .then((availability) => {
            res.status(200).json(availability);
        })
        .catch((err) => {
            console.log("Error getting schedule ", err);
            res.status(500).json(err);
        });
});

router.post("/add", (req, res) => {
    return tutor.addSlots(req.body.tutor_id, req.body.start_date, req.body.end_date,
        req.body.day, req.body.times)

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

router.get("/bookings/:tutorId", (req, res) => {
    console.log("tutor id: ", req.params.tutorId);
    tutor.getAppointmentsByTutorId(req.params.tutorId).then((appointments) => {
        res.status(200).send(appointments);
    }).catch((err) => {
        res.status(500).send("Availability not found");
    })
});



export default router;