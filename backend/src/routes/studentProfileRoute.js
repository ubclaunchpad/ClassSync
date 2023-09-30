import { Router } from "express";
const router = Router();


router.get("/pingcheck", (_, res) => {
  res.status(200).json({ message: "pong" });
});


export default router;