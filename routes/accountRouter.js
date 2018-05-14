const express = require("express");
const User = require("../models/userModel.js");

const accountRouter = express.Router();

accountRouter.get("/", (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) return res.status(500).send({success: false, err})
        if (user === null) return res.status(400).send({success: false, err: "User not found!"})
        return res.status(200).send({success: true, user: user.withoutPassword()})
    })
});

module.exports = accountRouter;