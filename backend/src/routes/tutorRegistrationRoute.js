import { Router } from "express";
import tutorRegistrationController from "../controllers/tutorRegistrationController.js";
import tutorAvailabilityRouter from "./tutorAvailabilityRoute.js"
import tutorAvailabilityController from "../controllers/tutorAvailabilityController.js";
const router = Router();
const tutor = new tutorRegistrationController();

router.get("/pingcheck", (_, res) => {
    res.send("pong");
});



router.get("/courses", (req, res) => {
    const tutor = new tutorAvailabilityController();
    const course_id = req.query.course_id;
    return tutor.getTutorByCourse(course_id).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).send({ error: err.detail });
    });
});

router.post("/log", (req, res) => {
    console.log("Adding log ", req.body.data)
    const tutor = new tutorRegistrationController();
    const data = req.body.data;
    return tutor.addLog(data).then(() => {
        res.status(200);
    }).catch((err) => {
        res.status(500).send({ error: err.detail });
    });

})
router.get("/select", (req, res) => {

    const tutor = new tutorAvailabilityController();
    const tutor_ids = req.query.tutor_ids;

    const startDate = req.query.start_date;

    const tutorIdsArray = tutor_ids !== "" ? tutor_ids.split(',').map(Number) : [];

    console.log("Tutor ids ", tutorIdsArray);

    return tutor.getSelectedTutorsAvailability(startDate, tutorIdsArray).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).send({ error: err.detail });
    });
});




router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    return tutor.login(email, password).then((result) => {
        // console.log("Result ", result);
        res.status(200).send(result);
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

router.get("/profile", (req, res) => {
    const userID = req.query.id;


    tutor.getProfile(userID).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).send({ error: err.detail });
    });
});

router.get("/allTutors", (req, res)=>{
    tutor.getAllTutors().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(500).send({error: err.detail});
    }); 
})

router.get("/offering", (req, res) => {
    const userID = req.query.id;
    return tutor.getTutorOfferings(userID).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).send({ error: err.detail });
    }
    );
});

router.post("/bio", async (req, res) => {
    const user_id = req.body.user_id;
    const bio = req.body.bio;

    try {
        await tutor.updateBio(user_id, bio);
        res.status(200).send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.detail || "Internal Server Error" });
    }
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