const express = require("express");
const app = express();
const port = 1234;

app.get("/", async (req, res) => {
    res.status(200).send("Salut!");
});

app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });