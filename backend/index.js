import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import tutorRegistrationRouter from "./src/routes/tutorRegistrationRoute.js";


const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_, res) => {
    res.send("Hello ClassSync!");
});

app.use("/tutor", tutorRegistrationRouter);



app.listen(port, () => {
    console.log(`Labby backend listening on port ${port}`);
});


