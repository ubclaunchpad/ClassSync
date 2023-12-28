import { Router } from "express";
import tutorRegistrationController from "../controllers/tutorRegistrationController.js";
import tutorAvailabilityRouter from "./tutorAvailabilityRoute.js"
const router = Router();
const tutor = new tutorRegistrationController();

router.get("/pingcheck", (_, res) => {
    res.send("pong");
});

router.post("/signup", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;

    // console.log(email, password)
    return tutor.signup(email, password, fname, lname).then((id) => {
        res.status(200).json({ id: id });
    }).catch((err) => {
        res.status(500).send({ error: err.detail });
    });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    return tutor.login(email, password).then((_email) => {
        res.status(200).json({ email: "Login successful for " + email });
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Login failed");
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
    const user_id = req.body.user_id;
    const bio = req.body.bio;

    tutor.updateBio(user_id, bio).then((result) => {
        res.status(200);
    }).catch((err) => {
        res.status(500).send({ error: err.detail });
    });
});

router.post("/offerings", (req, res) => {
    const { userID } = req.body.userID;
    const { offerings } = req.body.offerings;

    tutor.addOfferings(userID, offerings).then((result) => {
        res.status(200);
    })
});


router.get("/offerings", (req, res) => {

    return tutor.getAllOfferings().then((result) => {
        res.status(200).json(result);
    });
});
router.delete("/offerings", (req, res) => {
    const { userID } = req.body.userID;
    const { offerings } = req.body.offerings;

    tutor.deleteOfferings(userID, offerings).then((result) => {
        res.status(200);
    });
});

router.use("/availability", tutorAvailabilityRouter)



export default router;