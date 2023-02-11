const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
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

    resume : {
        type: Boolean,
        default: false
    },

    status : {
        type: String,
        default : "Please Upload Your Resume ..."
    },

    recruiter : {
        type: String,
        default: "N/A"
    }
});

module.exports = mongoose.model("User", userSchema);