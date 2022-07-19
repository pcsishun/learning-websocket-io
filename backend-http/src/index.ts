const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port:Number = 3435;

app.get("/", async (req:any, res:any) => {
    res.send("ok");
});

app.listen(port, () => {
    console.log(`API listen at port ${port} ==> http://localhost:${port}`);
});