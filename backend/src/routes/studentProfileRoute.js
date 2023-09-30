import { Router } from "express";
import StudentProfileController from "../controllers/studentProfileController.js";

const router = Router();
const studentProfileController = new StudentProfileController();

router.get("/pingcheck", (_, res) => {
    res.status(200).json({ message: "pong" });
});

router.post("/", authorize(), (req, res) => {
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

  router.delete("/:studentId", authorize(), (req, res) => {
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