import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentProfileRouter from "./src/routes/studentProfileRoute.js";
import volunteerEmailRoute from "./src/routes/volunteerEmailRoute.js"

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_, res) => {
    res.send("Hello ClassSync!");
});


app.use("/student-profile", studentProfileRouter);
app.use("/communication",volunteerEmailRoute);
app.listen(port, () => {
    console.log(`Labby backend listening on port ${port}`);
});


