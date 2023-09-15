const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send("Hello, World!")
})

app.get("/hello/:name", (req, res) => {
    res.send("Hello, "+ req.params.name);
})

app.listen(3000, () => {
    console.log("app on port 3000");
})