const express = require("express");
const usersRouter = express.Router();
const UserModel = require("../models/userModel.js");//constructor


usersRouter.route("/")
    .get((req, res) => {
        UserModel.find(req.query)
            .exec((err, foundUsers) => {
                if (err) return res.status(400).res.send(err)
                res.status(200).send(foundUsers);
            })
    })

    .post((req, res) => {
        const newUser = new UserModel(req.body);
        newUser.save((err, savedUser) => {
            if (err) return res.send(err);
            res.status(200).send(savedUser);
        })
    })

usersRouter.route("/:id")
    .get((req, res) => {
        UserModel.findOne({ _id: req.params.id })
            .exec((err, foundUser) => {
                if (err) {
                    res.status(400).send(err)
                } else if (foundUser) {
                    res.status(200).send(foundUser)
                } else {
                    res.status(404).send("User Not found")
                }
            })
    })

    .delete((req, res) => {
        UserModel.findOneAndRemove({ _id: req.params.id })
            .exec((err, deletedUser) => {
                if (err) {
                    res.status(400).send(err)
                } else if (deletedUser) {
                    res.status(204).send()
                } else {
                    res.status(404).send("404 --- User Not Found")
                }
            })
    })

    .put((req, res) => {
        UserModel.findOneAndUpdate({ _id: req.params },
            req.body, {
                new: true
            })
            .exec((err, updatedUser) => {
                if (err) {
                    res.status(400).send(err)
                } else if (updatedUser) {
                    res.status(200).send(updateUser)
                } else {
                    res.status(404).send("404 -- User Not Found")
                }
            })
    })

module.exports = usersRouter;