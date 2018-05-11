const express = require("express");
const cardRouter = express.Router();

cardRouter.get("/", (req, res) => {
    Product.find((err, cards) => {
        if (err) return res.status(500).send(err);
        return res.send(cards);
    });
});

cardRouter.post("/", (req, res) => {
    const newCard = new Card(req.body);
    newCard.save(err => {
        if (err) return res.status(500).send(err);
        return res.send(newCard);
    });
});

cardRouter.get("/:id", (req, res) => {
    Card.findById(req.params.id, (err, card) => {
        if (err) return res.status(500).send(err);
        return res.send(card);
    });
});

cardRouter.put("/:id", (req, res) => {
    Card.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCard) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedCard);
    });
});

cardRouter.delete("/:id", (req, res) => {
    Card.findByIdAndRemove(req.params.id, (err, removedCard) => {
        if (err) return res.status(500).send(err);
        return res.send(removedCard);
    });
});

module.exports = cardRouter;