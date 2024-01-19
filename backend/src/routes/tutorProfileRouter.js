import { Router } from "express";
import TutorProfileController from "../controllers/tutorProfileController.js";
const router = Router();
const tutor = new TutorProfileController();

// Gets a tutor's profile based on their tutorId
router.get("/courses", (req, res) => {
  console.log("getting courses by tutorId");
  const tutorId = req.query.userId;
  console.log(tutorId);
  tutor
    .getCoursesByTutorId(tutorId)
    .then((profile) => {
      res.status(200).send(profile);
    })
    .catch((err) => {
      res.status(500).send("Tutor Profile Not Found");
    });
});

export default router;
