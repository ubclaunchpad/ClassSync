import { Router } from "express";
import authorize from "../auth/authentication.js";
import parentAuthController from "../controllers/parentAuthController.js";
const router = Router();
const parent = new parentAuthController();

router.get("/pingcheck", (_, res) => {
  res.send("pong");
});

router.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;

  return parent
    .signup(email, password, fname, lname)
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
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Login failed");
    });
});

router.post("/testing-auth-middleware", authorize("Guardian"), (req, res) => {
  console.log("TESTING GUARDIAN AUTH MIDDLEWARE");

  /*
    FOR FUTURE REFERENCE:
    -> When using authorize middleware, we can use req.auth to get content from token
  */

  res
    .status(200)
    .send(
      `Authorized ${req.body.email} with user ID: ${req.auth.userId} and role: ${req.auth.role}`
    );
});

export default router;
