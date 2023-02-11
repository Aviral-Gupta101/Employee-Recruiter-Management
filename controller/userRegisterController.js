const bcrypt = require("bcrypt");
const user = require("../models/user");

const userRegister = async (req, res) => {

    const {username, password} = req.body;
    // console.log(req.body);

    if(!username || !password)
        return res.status(400).json({"Message" : "username and password is required"});

    try {

        const foundUser = await user.findOne({username : username}).exec();

        if(foundUser)
            return res.status(409).json({"Message" : "User already exists"});

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            username : username,
            password : hashedPwd
        });

        console.log(newUser);

        return res.json({"Message" : "User created"});
        
        
    } catch (error) {
        console.error("Error in userRegisterController\n" + error);
        return res.sendStatus(500);
    }
};

module.exports = {userRegister};