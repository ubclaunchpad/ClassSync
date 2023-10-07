import { Router } from "express";
import tutorRegistrationController from "../controllers/tutorRegistrationController.js";
const router = Router();
const tutor = new tutorRegistrationController();

router.get("/pingcheck", (_, res) => {
    res.send("pong");
});

router.post("/create", (req, res) => {
    const { userID } = req.body.userID;
    const { password } = req.body.password;
    tutor.createAccount(userID, password).then(() => {
        res.status(200);
    }).catch((err) => {
        res.status(500).send("Account failed to activate");
    });
});

router.post("/password", (req, res) => {
    const { newPassword } = req.body.password;
    const { userID } = req.body.userID;

    tutor.updatePassword(userID, newPassword).then((result) => {
        res.status(200);
    });
});

router.post("/bio", (req, res) => {
    const { userID } = req.body.userID;
    const { bio } = req.body.bio;

    tutor.updateBio(userID, bio).then((result) => {
        res.status(200);
    });
});

router.post("/offerings", (req, res) => {
    const { userID } = req.body.userID;
    const { offerings } = req.body.offerings;

    tutor.addOfferings(userID, offerings).then((result) => {
        res.status(200);
    })
});

router.delete("/offerings", (req, res) => {
    const { userID } = req.body.userID;
    const { offerings } = req.body.offerings;

    tutor.deleteOfferings(userID, offerings).then((result) => {
        res.status(200);
    });
});





export default router;