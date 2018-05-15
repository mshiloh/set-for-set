const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const expressJwt = require("express-jwt");
const logger = require("./middleware/logger.js");

const cardRouter = require("./routes/cardRouter.js");
const usersRouter = require("./routes/userRouter.js");
const authRouter = require("./routes/authRouter.js");
const scoresRouter = require("./routes/scoresRouter.js")

const app = express();

//config
const port = process.env.PORT;
const db = process.env.MONGODB_URI;

//middleware
app.use(bodyParser.json())
app.use(logger);
app.use(express.static(path.join(__dirname, "client", "build")));

//routes below
app.use("/api", expressJwt({ secret: process.env.SECRET }));

app.use("/api/users", usersRouter);
app.use("/api/setCards", cardRouter);
app.use("/api/scores", scoresRouter);

app.use("/auth", authRouter);

// route for deployment
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//connect to db
mongoose.connect(db, (err) => {
    if (err) console.error(err);
    console.log("Connected to MongoDB");
});

//server
app.listen(port, () => console.log("Server running on port: " + port));