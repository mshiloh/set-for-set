const express = require("express");
const scoresRouter = express.Router();
const UserModel = require("../models/userModel.js");//constructor


scoresRouter.route("/")
    .get((req, res) => {
        UserModel.find(req.query)
            .select("bestScore name")
            .exec((err, foundUsers) => {
                if (err) return res.status(400).res.send(err)
                res.status(200).send({ user: foundUsers, success: true })
            })})

module.exports = scoresRouter;