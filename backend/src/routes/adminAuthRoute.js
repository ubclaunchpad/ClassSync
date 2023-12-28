import { Router } from "express";
import adminAuthController from "../controllers/adminAuthController.js";
const router = Router();
const admin = new adminAuthController();

router.get("/pingcheck", (_, res) => {
  res.send("pong");
});

router.post("/signup", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;


    return admin.signup(email, password, fname, lname).then((id) => {
        res.status(200).json({ id: id });
    }).catch((err) => {
        console.log(err);
        res.status(500).send("Signup failed");
    });
});

router.post("/login", (req, res) => {
  console.log("ADMIN LOGIN REQUEST");
  const email = req.body.email;
  const password = req.body.password;

  return admin
    .login(email, password)
    .then((response) => {
      res.status(200).json({
        email: response.email,
        role: response.role,
        token: response.token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Login failed");
    });
});
export default router;
