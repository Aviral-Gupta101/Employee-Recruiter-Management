const user = require("../models/user");
const recruiter = require("../models/recruiter");

const assginUser = async (req, res) => {

    // Recruiter username
    const {username} = req.body;

    try {

        const currentRecruiter = await recruiter.findOne({username : username}).exec();

        if(!currentRecruiter)
            return res.sendStatus(401);
        
        if(currentRecruiter.currentUser != "N/A")
            return res.status(409).json({"Message" : "User already assigned"});
        
        const foundUser = await user.findOne({resume : true, recruiter : "N/A"});

        if(!foundUser)
            return res.json({"Message" : "No user available"});
        
        currentRecruiter.currentUser = foundUser.username;
        foundUser.status = "Recruiter " + username + " assigned";
        foundUser.recruiter = username;

        await currentRecruiter.save();
        await foundUser.save();

        return res.json({"Message" : "User " + foundUser.username + " Assigned"});

        
    } catch (error) {
        console.error("Error in assignUserController.js\n", error);
    }
    
};

module.exports = {assginUser};