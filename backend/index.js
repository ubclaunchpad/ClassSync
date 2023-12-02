import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import tutorRegistrationRouter from "./src/routes/tutorRegistrationRoute.js";
import volunteerEmailRoute from "./src/routes/volunteerEmailRoute.js"
import parentSignupRoute from "./src/routes/parentSignupRoute.js"

const app = express();
const port = 8080;

import pkg from 'pg';
const { Pool } = pkg;

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

const pgPool = new Pool(dbConfig);
await pgPool.connect()
    .then(client => {
        console.log("Test Connection Open");
        client.release();
        console.log("Test Connection Closed")
    })
    .catch(err => {
        console.error("Error connecting to the PostgreSQL database:", err);
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (_, res) => {
    res.send("Hello ClassSync!");
});

app.use("/tutor", tutorRegistrationRouter);
app.use("/parent", parentSignupRoute)


app.use("/communication", volunteerEmailRoute);
app.listen(port, () => {
    console.log(`ClassSync backend listening on port ${port}`);
});


export { pgPool }