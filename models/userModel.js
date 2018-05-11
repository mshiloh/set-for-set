const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    bestScore: {
        type: Number,
        default: 0
    },
    avatar: {
        type: String

    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });


UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next()
    });
});

UserSchema.methods.checkPassword = function (passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    })
}

UserSchema.methods.withoutPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

UserSchema.methods.scores = function () {
    const user = this.toObject();
    delete user.password;
    delete user.email;
    delete user.isAdmin;
    return user;
}






const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;