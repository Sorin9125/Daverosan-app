const dotenv = require("dotenv");
const express = require("express");
const { db } = require("./models");
const routes = require("./routes");
const app = express()
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

app.use(cors({
    origin: process.env.ORIGIN_SITE,
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Methods",
        "Access-Control-Request-Headers",
        "Access-Control-Allow-Origin"
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

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
app.get("/", async (req, res) => {
    res.status(200).send("Salut!");
});

app.post("/api/reset", async (req, res) => {
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

