const dotenv = require("dotenv");
const express = require("express");
const { db } = require("./models");
const routes = require("./routes");
const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT;
app.get("/", async (req, res) => {
    res.status(200).send("Salut!");
});

app.post("/reset", async (req, res) => {
    try {
        await db.sync({ force: true });
        res.status(200).send("Database reset succeeded");
    } catch (err) {
        console.log(err);
    }
});

app.use("/api", routes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

