const jwt = require("jsonwebtoken");

const verifyAdminJWT = (req, res, next) => {

    const bearerHeader = req.headers["authorization"];

    if(!bearerHeader)
        return res.sendStatus(401);
    
    const access_token = bearerHeader.split(' ')[1];

    jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, decode)=> {

        if(err || decode.role != "admin")
            return res.sendStatus(401);

        next();
    });

};

module.exports = verifyAdminJWT;