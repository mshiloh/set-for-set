const express = require("express");
const authRouter = express.Router();
const UserModel = require("../models/userModel.js"); 
const jwt = require("jsonwebtoken");

authRouter.post("/signup", (req, res) => {
    UserModel.findOne({ username: req.body.username })
        .exec((err, foundUser) => {
            if (err) return res.status(500).send(err);
            if (foundUser) {
                return res.status(400).send({ success: false, err: "User already exists!" });
            } else {
                  const newUser = new UserModel(req.body);
                newUser.save((err, user) => {
                    if (err) return res.status(500).send(err);
                    const token = jwt.sign(user.toObject(), process.env.SECRET);
                    res.status(201).send({ success: true, user:user.withoutPassword(), token });
                })
            }
        })
});
authRouter.post("/login", (req, res) => {
    UserModel.findOne({ username: req.body.username.toLowerCase() })
        .exec((err, user) => {
            if (err) return res.status(500).send(err);
            if (!user || user.password !== req.body.password) {
                return res.status(403).send({ success: false, err: "Email or password is invalid" });
            }
            
            const token = jwt.sign(user.toObject(), process.env.SECRET);
            res.status(200).send({ success: true, token, user:user.withoutPassword() });

        })
})


module.exports = authRouter