const recruiter = require("../models/recruiter");
const path = require("path");
const fs = require("fs");

const getResume = async (req, res) => {

    // Recruiter username
    const {username} = req.body;

    try {

        const currentRecruiter = await recruiter.findOne({username : username}).exec();

        if(!currentRecruiter)
            return res.sendStatus(401);

        // console.log(currentRecruiter);
        
        if(currentRecruiter.currentUser == "N/A")
            return res.status(404).json({"Message" : "User not assigned"});
        
        const assignedUser = currentRecruiter.currentUser;
        
        var resume = assignedUser;

        if (fs.existsSync(path.join(__dirname, "../uploads", resume + ".pdf"))) {
            resume = resume + ".pdf";
        }
        else if (fs.existsSync(path.join(__dirname, "../uploads", resume + ".jpg"))) {
            resume = resume + ".jpg";
        }

        else if (fs.existsSync(path.join(__dirname, "../uploads", resume + ".jpeg"))) {
            resume = resume + ".jpeg";
        }

        return res.sendFile(path.join(__dirname, "../uploads", resume));

        
    } catch (error) {
        console.error("Error in getResumeController.js\n", error);
    }
    
};

module.exports = {getResume};