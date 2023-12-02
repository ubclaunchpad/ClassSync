import { Router } from "express";
import adminBookingController from "../controllers/adminBookingController.js";
const router = Router();
const admin = new adminBookingController();

router.get("/pingcheck", (_, res) => {
  res.send("pong");
});

router.post("/", (req, res) => {
  const tutor = req.body.tutorId;
  const student = req.body.studentId;
  const course = req.body.courseId;
  const date = req.body.startDate;
  const duration = req.body.duration;
  admin
    .setAppointment(tutor, student, course, date, duration)
    .then(() => {
      res.status(200);
    })
    .catch((err) => {
      res.status(500).send("Appointment not added");
    });
});

router.post("/update", (req, res) => {
  const appointment = req.body.appointmentId;
  const tutor = req.body.tutorId;
  const course = req.body.courseId;
  const date = req.body.startDate;
  const duration = req.body.duration;
  admin
    .updateAppointment(appointment, tutor, course, date, duration)
    .then(() => {
      res.status(200);
    })
    .catch((err) => {
      res.status(500).send("Appointment not updated");
    });
});

router.delete("/", (req, res) => {
  const appointment = req.body.appointmentId;
  admin
    .deleteAppointment(appointment)
    .then(() => {
      res.status(200);
    })
    .catch((err) => {
      res.status(500).send("Appointment not deleted");
    });
});

export default router;
