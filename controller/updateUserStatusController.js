const user = require("../models/user");
const recruiter = require("../models/recruiter");

const updateUserStatus = async (req, res) => {

    // Recruiter username
    const {username, status} = req.body;
    // console.log(req.body);

    try {

        const currentRecruiter = await recruiter.findOne({username : username}).exec();

        if(!currentRecruiter)
            return res.sendStatus(401);
        
        if(currentRecruiter.currentUser == "N/A")
            return res.status(409).json({"Message" : "User not assigned"});

        // Person who gave resume
        const assginUser = currentRecruiter.currentUser;
        
        const foundUser = await user.findOne({username : assginUser});

        if(!foundUser)
            return res.status(409).json({"Message" : "No user found"});
        
        var statusToLower = status; 
        statusToLower = statusToLower.charAt(0).toUpperCase() + statusToLower.slice(1).toLowerCase();

        console.log(statusToLower);

        foundUser.status = statusToLower;

        if( statusToLower === "Rejected" || statusToLower === "Accepted"){
            foundUser.recruiter = "-";
            currentRecruiter.currentUser = "N/A";
        }
        

        await currentRecruiter.save();
        await foundUser.save();

        return res.json({"Message" : "User status updated"});

        
    } catch (error) {
        console.error("Error in assignUserController.js\n", error);
    }
    
};

module.exports = {updateUserStatus};