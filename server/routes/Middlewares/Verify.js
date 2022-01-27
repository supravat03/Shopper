require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


/**
 * 
 * @param {Request } req 
 * @param {Response} res 
 * @param {next} next 
 * @returns {} 
 */
// middleware to verify a token
const verifyTokenMiddleware = (req, res, next) => {
    //get bearer token from headers['authorization']
    const { authorization } = req.headers;
    // console.log("Authorization: ",authorization);
    const token = authorization && authorization.split(' ')[1];
    // console.log(token);
    if (!token) return res.json('access denied');
    // verify the token
    try {
        const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
        // console.log(verifiedToken);
        //save user_id in req
        req.user_id = verifiedToken.user_id;
        next();
    } catch (error) {
        console.log(error);
        return res.json("Invalid Token !!")
    }
}

module.exports={
    verifyTokenMiddleware
}