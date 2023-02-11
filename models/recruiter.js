const mongoose = require("mongoose");
const schema = mongoose.Schema;

const recruiterSchema = new schema({
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

    currentUser : {
        type: String,
        default : "N/A"
    },

});

module.exports = mongoose.model("Recruiter", recruiterSchema);