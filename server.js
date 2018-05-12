const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const expressJwt = require("express-jwt");
const logger = require("./middleware/logger.js");
const cardRouter = require("./routes/cardRouter.js");
const usersRouter = require("./routes/userRouter.js");
const authRouter = require("./routes/authRouter.js");
const scoresRouter = require ("./routes/scoresRouter.js")


require("dotenv").config();

const app = express();

//config
const port = process.env.PORT || 8090;
const db = process.env.MONGODB_URI || "mongodb://localhost";

//connect to db
mongoose.connect(db, (err) => {
    if (err) console.error(err);
    console.log("Connected to MongoDB");
});

//middleware
app.use(bodyParser.json())
app.use(logger);
app.use(express.static(path.join(__dirname, "client", "build")));

//routes below
app.use("/api", expressJwt({ secret: process.env.SECRET }));
app.use("auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/cards", cardRouter);
app.use("/auth", authRouter)
app.use("/scores", scoresRouter)

// route for deployment
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//server
app.listen(port, () => console.log("Server running on port: " + port));

