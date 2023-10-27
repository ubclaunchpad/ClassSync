import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import studentProfileRouter from "./src/routes/studentProfileRoute.js";
import tutorRegistrationRouter from "./src/routes/tutorRegistrationRoute.js";

const app = express();
const port = 8080;

import pkg from 'pg';
const { Client } = pkg;

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        ca: process.env.DB_SSL
    }
};

const pgClient = new Client(dbConfig);

pgClient.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_, res) => {
    res.send("Hello ClassSync!");
});

app.use("/tutor", tutorRegistrationRouter);


app.use("/student-profile", studentProfileRouter);

app.listen(port, () => {
    console.log(`Labby backend listening on port ${port}`);
});


