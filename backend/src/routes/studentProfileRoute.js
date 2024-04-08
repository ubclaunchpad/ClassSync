import { Router } from "express";
import StudentProfileController from "../controllers/studentProfileController.js";
import authorize from "../auth/authentication.js";

const router = Router();
const studentProfileController = new StudentProfileController();

router.get("/pingcheck", (_, res) => {
    res.status(200).json({ message: "pong" });
});

router.get("/enrollment", (req, res) => {
  studentProfileController
  .getStudentEnrollment(req.query.enrollment_id)
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((err) => {
    res.status(404).json(err);
  });
});


router.get("/", (_, res) => {
  studentProfileController
    .getStudentProfile()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/bookings/student/:studentId", (req, res) => {
  studentProfileController
    .getBookingsByStudentId(req.params.studentId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/bookings/guardian/:guardianId", (req, res) => {
  studentProfileController
    .getBookingsByGuardianId(req.params.guardianId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/", (req, res) => { 
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    studentProfileController
      .saveStudentProfile(req)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

  router.delete("/:studentId", (req, res) => { // authorize()
    studentProfileController
      .deleteStudentProfile(req.params.studentId)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

export default router;