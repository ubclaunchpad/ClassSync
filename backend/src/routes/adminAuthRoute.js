import { Router } from "express";
import authorize from "../auth/authentication.js";
import adminAuthController from "../controllers/adminAuthController.js";
import adminRoute from "../routes/adminRoute.js";
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

  return admin
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
  console.log("ADMIN LOGIN REQUEST");
  const email = req.body.email;
  const password = req.body.password;

  return admin
    .login(email, password)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Login failed");
    });
});

router.post("/testing-auth-middleware", authorize("Admin"), (req, res) => {
  console.log("TESTING ADMIN AUTH MIDDLEWARE");

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

router.use("/", adminRoute)
export default router;
