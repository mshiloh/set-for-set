const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const logger = require("./middleware/logger.js");
const cardRouter = require("./routes/cards.js");
const userRouter = require("./routes/users.js");

const app = express();

//config
const port = process.env.PORT || 8090;
const db = process.env.MONGODB_URI || "mongodb://localhost";

//middleware
app.use(bodyParser.json())
app.use(logger);
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
app.use("/api/cards", cardRouter);
app.use("/api/users", userRouter)


// route for deployment
app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//db
mongoose.connect(db, (err) => {
    if (err) console.error(err);
    console.log("Connected to MongoDB");
});

app.use("/cards", require("./routes/cards"));
// app.use("/users", require("./routes/users"));

//server
app.listen(port, () => console.log("Server running on port: " + port));

