import { Router } from "express";
import StudentProfileController from "../controllers/studentProfileController.js";
import tutorAvailabilityController from "../controllers/tutorAvailabilityController.js";

const router = Router();
const student = new StudentProfileController();

router.get("/students", (_, res) => {
    student
        .getStudents()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

router.get("/bookings", (req, res) => {
    const student_id = req.query.student_id;
    const course_id = req.query.course_id;
    student
        .getBookings(student_id, course_id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.get("/appointments", (req, res) => {
    const tutor = new tutorAvailabilityController();
    return tutor.getAppointmentsByTutor(req.query.tutor_id, req.query.date)
        .then((availability) => {
            res.status(200).json(availability);
        })
        .catch((err) => {
            console.log("Error getting schedule ", err);
            res.status(500).json(err);
        });
});
export default router;