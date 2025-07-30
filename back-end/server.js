const dotenv = require("dotenv");
const express = require("express");
const { db } = require("./models");
const routes = require("./routes");
const app = express()
const cors = require("cors");
app.use(express.json());
dotenv.config();

app.use(cors({
    origin: [process.env.ORIGIN_SITE],
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Acces-Control-Allow-Methods",
        "Acces-Control-Request-Headers",
        "Acces-Control-Allow-Origin"
    ],
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
    ]
})
);

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
        res.status(500).send("Eroare!");
    }
});

app.use("/api", routes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

