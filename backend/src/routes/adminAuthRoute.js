import { Router } from "express";
import adminAuthController from "../controllers/adminAuthController.js";
const router = Router();
const admin = new adminAuthController();

router.get("/pingcheck", (_, res) => {
    res.send("pong");
});


router.post("/signup", (req, res) => {
    const email = req.query.email;
    const password = req.query.password;


    return admin.signup(email, password).then((id) => {
        res.status(200).json({ id: id });
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Signup failed");
    });
});

router.post("/login", (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    return admin.login(email, password).then((_email) => {
        res.status(200).json({ email: "Login successful for " + email });
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Login failed");
    });
});
export default router;