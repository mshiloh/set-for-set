const mongoose = require ('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required : true
    },
    score:{
        type: Number,
        default: 0
    },
    avatar:{
        type: String
       
    },
    isAdmin:{
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const UserModel = mongoose.model ("user", UserSchema);
module.exports = UserModel