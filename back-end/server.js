const express = require("express");
const { db } = require("./models");
const routes = require("./routes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

const port = 1234;

app.get("/", async (req, res) => {
    res.status(200).send("Salut!");
});

app.post("/reset", async (req, res) => {
    try {
        await db.sync({ force: true });
        res.status(200).send("Database reset succeeded");
    } catch (err) {
        console.log(err);
        res.status(500).send("eroare");
    }
});

app.use("/api", routes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

