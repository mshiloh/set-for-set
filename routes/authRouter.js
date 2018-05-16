const express = require("express");
const authRouter = express.Router();
const UserModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", (req, res) => {
    UserModel.findOne({ email: req.body.email })
        .exec((err, foundUser) => {
            if (err) return res.status(500).send(err);
            if (foundUser) {
                return res.status(400).send({ success: false, err: "User already exists!" });
            } else {
                const newUser = new UserModel(req.body);
                newUser.save((err, user) => {
                    if (err) return res.status(500).send(err);
                    const token = jwt.sign(user.toObject(), process.env.SECRET);
                    res.status(201).send({ success: true, user: user.withoutPassword(), token });
                })
            }
        })
});

authRouter.post("/login", (req, res) => {
    UserModel.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(403).send({ success: false, message: "Invalid Username" })
        user.checkPassword(req.body.password, (err, match) => {
            if (err) return res.status(500).send(err);
            if (!match) return res.status(401).send({ success: false, message: "Invalid Password" })
            const token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: "4w" });
            return res.send({ token: token, user: user.withoutPassword(), success: true })
        })
    });
});


module.exports = authRouter;