const mongoose = require("mongoose");
const schema = mongoose.Schema;

const adminSchema = new schema({
    username : {
        type: String,
        required: true
    },

    password : {
        type: String,
        required: true
    },

    refreshToken : {
        type: String
    },

});

module.exports = mongoose.model("Admin", adminSchema);