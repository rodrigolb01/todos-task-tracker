const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String,
        required: true,
        default: ""
    }
},
{
    timestamps: true
});

const User = mongoose.model("User", UserSchema);
module.exports = User;