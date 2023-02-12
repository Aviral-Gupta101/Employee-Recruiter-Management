const jwt = require("jsonwebtoken");

const verifyRecruiterJWT = (req, res, next) => {

    const bearerHeader = req.headers["authorization"];

    if(!bearerHeader)
        return res.sendStatus(401);
    
    const access_token = bearerHeader.split(' ')[1];

    jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, decode)=> {

        if(err || decode.role != "recruiter")
            return res.sendStatus(401);

        req.body.role = decode.role;
        req.body.username = decode.username;
        next();
    });

};

module.exports = verifyRecruiterJWT;