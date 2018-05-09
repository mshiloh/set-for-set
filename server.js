const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRouter = require ("./routes/usersRouter.js");
const authRouter = require ("./routes/authRouter.js");

// import routes
const app = express();

const port = process.env.PORT || 8090;
const db = process.env.MONGODB_URI || "mongodb://localhost:27017/set-for-set";

//middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));

//routes below
app.use("/api", expressJwt({secret: process.env.SECRET}));
app.use("/api/users", usersRouter)
app.use("/auth", authRouter)

// route for deployment
app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//db
mongoose.connect(db, (err) => {
    if (err) console.error(err);
    console.log("Connected to MongoDB");
});

//server
app.listen(port, () => console.log("Server running on port: " + port));

