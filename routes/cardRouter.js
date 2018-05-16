const express = require("express");
const cardRouter = express.Router();
const CardModel = require("../models/cardModel.js")

// GET all request
cardRouter.route("/")
    .get((req, res) => {
        CardModel.find(req.query)
            .exec((err, foundCards) => {
                if (err) return res.send(err);
                res.status(200).send(foundCards)
            });
    })
    //POST ALL request
    .post((req, res) => {
        CardModel.insertMany(req.body, (err, docs)=> {
            if(err) return res.status(500).send(err);
            res.status(200).send(docs);
        })
    })

// GET one request
cardRouter.route("/:id")
    .get((req, res) => {
        CardModel.findOne({ _id: req.params.id })
            .exec((err, foundCard) => {
                if (err) return res.send(err);
                if (!foundCard) return res.status(404).send({ message: "card not found" })
                res.status(200).send(foundCard);
            });
    })
    // DELETE one request
    .delete((req, res) => {
        CardModel.findOneAndRemove({ _id: req.params.id }, (err, deletedCard) => {
            if (err) return res.send(err);
            if (!deletedCard) return res.status(404).send({ message: "card not found" })
            res.status(204).send();
        })
    })
    //PUT one request
    .put((req, res) => {
        CardModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .exec((err, updatedCard) => {
                if (err) return res.send(err);
                if (!updatedCard) return res.status(404).send({ message: "card not found" });
                res.status(200).send(updatedCard);
            })
    })

module.exports = cardRouter;