import adminController from "../controllers/adminController.js";
import { Router } from "express";

const admin = new adminController();
const router = Router();

router.get("/", (req, res) => {
    return admin.getTutorReviews(req.query.id)
        .then((reviews) => {
            console.log("Reviews ", reviews);
            res.status(200).json(reviews);
        })
        .catch((err) => {
            console.log("Error getting reviews ", err);
            res.status(500).json(err);
        });
});

router.post("/", (req, res) => {
    return admin
        .addReview(req.body)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log("Error adding review ", err);
            res.status(500).json(err);
        });
});

export default router