const express = require("express");
const { db } = require("./models");

const app = express();

const port = 1234;

app.get("/", async (req, res) => {
    res.status(200).send("Salut!");
});

app.get("/reset", async (req, res) => {
    try {
        db.sync({ force: true });
        res.status(200).send("Database reset succeeded");
    } catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});