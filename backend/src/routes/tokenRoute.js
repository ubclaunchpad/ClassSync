
import adminController from "../controllers/adminController.js";
import { Router } from "express";

const router = Router();


// // Validate token
router.get("/:id", (req, res) => {
    const admin = new adminController()
    admin.validateToken(req.params.id).then((result) => {
        res.status(200).json(result)
    }).catch((e) => {
        res.status(500).json("Token does not exist")
    })
})

// // get token
router.get("/", (req, res) => {
    const admin = new adminController()
    admin.getToken().then((result) => {
        res.status(200).json(result)
    }).catch((e) => {
        res.status(500).json(err)
    })
})



// // Delete token
router.delete("/:id", (req, res) => {
    const admin = new adminController()
    admin.deleteToken(req.params.id).then((result) => {
        res.status(200).json(result)
    }).catch((e) => {
        res.status(500).json(err)
    })
})

export default router