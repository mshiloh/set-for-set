const express = require("express");
const userRouter = express.Router();
const UserModel = require("../models/userModel.js");//constructor
const bcrypt = require("bcrypt");


userRouter.route("/verify")
    .get((req, res) => {
        UserModel.findById(req.user._id)
            .exec((err, foundUser) => {
                if (err) return res.status(400).res.send(err)
                res.status(200).send(foundUser.withoutPassword());
            })
    })

    //this is done by the AUTH POST request in authRouter
    // .post((req, res) => {
    //     const newUser = new UserModel(req.body);
    //     newUser.save((err, savedUser) => {
    //         if (err) return res.send(err);
    //         res.status(200).send(savedUser);
    //     })
    // })

    // userRouter.route("/:id")
    //     .get((req, res) => {
    //         UserModel.findOne({ _id: req.params.id })
    //             .exec((err, foundUser) => {
    //                 if (err) {
    //                     res.status(400).send(err)
    //                 } else if (foundUser) {
    //                     res.status(200).send(foundUser)
    //                 } else {
    //                     res.status(404).send("404")
    //                 }
    //             })
    //     })

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

userRouter.route("/edit-profile")
    .put((req, res) => {
        UserModel.findOne({ email: req.body.email, _id: { $ne: req.user._id } }, (err, existingUser) => {
            if (err) return res.status(500).send({ success: false, err });
            if (existingUser) res.status(403).send({ message: "A user with that email already exists!" })
            UserModel.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true }, (err, updatedUser) => {
                if (err) return res.status(500).send(err);
                console.log(updatedUser);
                console.log(req.body);
                res.status(200).send({ success: true, user: updatedUser.withoutPassword() });
            })
        })
    })

userRouter.route("/change-password")
    .post((req, res) => {
        UserModel.findById(req.user._id, function (err, user) {
            if (err) {
                res.status(500).send(err);
            } else {
                user.password = req.body.password;
                user.save(function (err, user) {
                    res.send({success: true, user: user.withoutPassword()});
                });
            }
        });
    })

module.exports = userRouter;