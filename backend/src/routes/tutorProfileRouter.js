import { Router } from "express";
import tutorProfileController from "../controllers/tutorProfileController";
const router = Router();
const tutor = new tutorProfileController();

// Gets a tutor's profile based on their tutorId
router.get("/tutorProfile", (req, res) => {
  const tutorId = req.body.tutorId;
  tutor
    .getTutorProfile(tutorId)
    .then((profile) => {
      res.status(200).send(profile);
    })
    .catch((err) => {
      res.status(500).send("Tutor Profile Not Found");
    });
});

export default router;
