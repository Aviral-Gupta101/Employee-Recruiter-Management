const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
    
    const {username, password} = req.body;
    // console.log(req.body);

    if(!username || !password)
        return res.status(400).json({"Message" : "username and password is required"});

        try {

            const foundUser = await user.findOne({username : username}).exec();
    
            if(!foundUser)
                return res.status(401).json({"Message" : "Invalid username or password"});
    
            console.log(foundUser);

            const isMatch = await bcrypt.compare(password, foundUser.password);
            
            if(!isMatch)
                return res.status(401).json({"Message" : "Invalid username or password"});
            
            // FIXME: change the expiry
            const accessToken = jwt.sign({username : foundUser.username, role: "user"}, process.env.ACCESS_TOKEN, {expiresIn: "1d"});
            const refreshToken = jwt.sign({username : foundUser.username, role : "user"}, process.env.REFRESH_TOKEN, {expiresIn: "1d"});
            
            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            res.cookie("jwt", accessToken, {httpOnly: true, sameSite: "None", secure: true, maxAge: 24*60*60*1000});

            return res.json({"access_token" : accessToken});
        
            
            
        } catch (error) {
            console.error("Error in userLoginController \n" + error);
            return res.sendStatus(500);
        }

};

module.exports = {userLogin};