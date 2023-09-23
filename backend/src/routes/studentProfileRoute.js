import { Router } from "express";
const router = Router();


router.get("/pingcheck", authorize(), (_, res) => {
    res.status(200).json({ message: "pong" });
});


export default router;