import { Router } from "express";
import parentAuthController from "../controllers/parentAuthController.js";
const router = Router();
const parent = new parentAuthController();

router.get("/pingcheck", (_, res) => {
  res.send("pong");
});

router.post("/signup", (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  return parent
    .signup(email, password)
    .then((id) => {
      res.status(200).json({ id: id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Signup failed");
    });
});

router.post("/login", (req, res) => {
  console.log("PARENT LOGIN REQUEST");
  const email = req.body.email;
  const password = req.body.password;

  return parent
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
