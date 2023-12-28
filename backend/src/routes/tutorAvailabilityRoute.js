import { Router } from "express";
import tutorAvailabilityController from "../controllers/tutorAvailabilityController.js";
const router = Router();
const tutor = new tutorAvailabilityController();


router.get("/pingcheck", (_, res) => {
    res.send("pong");
});

router.get("/dates", (req, res) => {


    tutor.getDates(22).then((dates) => {
        res.status(200).send(dates);
    }).catch((err) => {
        res.status(500).send({ error: "Dates not found ", err });
    })
});

router.get("/", (req, res) => {
    const userID = req.body.userID;
    tutor.getAvailability(userID).then((availability) => {
        res.status(200).send(availability);
    }).catch((err) => {
        res.status(500).send("Availability not found");
    })
});

router.post("/", (req, res) => {
    const userID = req.body.userID;
    const weeks = req.body.weeks;
    // const weeks = req.body.weeks;
    const availability = req.body.availability;
    console.log(req.body);

    return tutor.setAvailability(userID, weeks, availability).then((result) => {
        console.log("Availability added")
        res.status(200).send({ id: result });
    }).catch((err) => {
        console.log("Availability not added")
        res.status(500).send({ error: "Availability not added" + err });
    });
});

router.delete("/", (req, res) => {
    const userID = req.body.userID;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    tutor.deleteAvailability(userID, startDate, endDate).then(() => {
        res.status(200);
    }).catch((err) => {
        res.status(500).send("Availability not deleted");
    });
})

export default router;