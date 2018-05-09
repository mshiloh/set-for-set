const mongoose = require("mongoose");

const { Schema } = mongoose;

const cardSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    filling: {
        type: String,
        required: true
    },
    shape: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
})

const CardModel = mongoose.model("cardModel", cardSchema);
module.exports = CardModel;