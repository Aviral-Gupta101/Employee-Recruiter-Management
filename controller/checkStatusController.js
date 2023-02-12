const user = require("../models/user");

const checkStatus = async (req, res) => {

    const {username, role} = req.body;
    
    const findUser = await user.findOne({username:username}).exec();

    if(!findUser || role != "user"){
        console.log("User not found");
        return res.sendStatus(403);
    }
    
    return res.json({"status" : findUser.status});
};

module.exports = {checkStatus};