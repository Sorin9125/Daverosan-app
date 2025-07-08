const express = require("express");
const { db } = require("./models");
const router = express.Router();
const routes = require("./routes");

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

router.use("/api", routes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

