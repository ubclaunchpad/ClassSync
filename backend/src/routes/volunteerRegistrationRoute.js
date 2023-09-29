import { Router } from "express";
import volunteerRegistrationController from "../controllers/volunteerRegistrationController.js";
const router = Router();
const volunteer = new volunteerRegistrationController();



router.get("/pingcheck", (_, res) => {
    res.send("pong");
});

router.post("/activate", (req, res) => {
    const { userID } = req.body.userID;
    const { password } = req.body.password;
    volunteer.activateAccount(userID).then(() => {
        volunteer.setPassword(userID, password).then(() => {
            res.status(200);
        });
    }).catch((err) => {
        res.status(500).send("Account failed to activate");
    });
});

router.post("/password", (req, res) => {
    const { password } = req.body.password;
    const { userID } = req.body.userID;

    volunteer.setPassword(userID, password).then((result) => {
        res.status(200);
    });
});

router.post("/bio", (req, res) => {
    const { userID } = req.body.userID;
    const { bio } = req.body.bio;

    volunteer.updateBio(userID, bio).then((result) => {
        res.status(200);
    });
});

router.post("/offerings", (req, res) => {
    const { userID } = req.body.userID;
    const { offerings } = req.body.offerings;

    volunteer.updateOfferings(userID, offerings).then((result) => {
        res.status(200);
    });
});





export default router;