require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const saltRounds = 10;
const nodemailer= require('nodemailer');

/**
 * 
 * @param {string} user_id 
 * @returns {access_token} ACCESS_TOKEN 
 */
//crate access token with expiration using user_id
const createAccessToken = async (user_id) => {
    return jwt.sign({ user_id: user_id }, process.env.ACCESS_TOKEN, { expiresIn: '60s' });
}

/**
 * 
 * @param {string} user_id 
 * @returns {refresh_token} REFRESH_TOKEB
 */
const createRefreshToken = async (user_id) => {
    return jwt.sign({ user_id: user_id }, process.env.REFRESH_TOKEN, { expiresIn: '7 days' });
}

/**
 * 
 * @param {string} email 
 * @returns {} JWT_TOKEN
 */
const createEmailToken=async (email)=>{
    return jwt.sign({email:email},process.env.EMAIL_TOKEN,{expiresIn:'10m'});
}

/**
 * 
 * @param {string} plainPassword 
 * @param {string} encryptedPassword 
 * @returns TRUE/FALSE
 */
const verifyPassword=async (plainPassword, encryptedPassword)=>{
    return await bcrypt.compare(plainPassword, encryptedPassword);

}


/**
 * 
 * @param {string} plainText 
 * @returns HASHED_TEXT
 */
const hash=async (plainText,saltRounds)=>{
    return await bcrypt.hash(plainText, saltRounds);
}



/**
 * 
 * @param {object} request_object 
 */
const sendConfirmationMail=async (req)=>{
    const email= req.body.email;
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 's.supravat1996@gmail.com',
                pass: 'Abc@1234'
            }
            });
    
          const email_token = await createEmailToken(email);
    
    
          let info = await transporter.sendMail({
            from: 's.supravat1996@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Email confirmation", // Subject line
            text: `http://localhost:3001/api/user/confirm/${email_token}`, // plain text body
          });
    
    
          console.log(info);
        
    } catch (error) {
        console.log(error);
        throw new error;
        
    }
    

}

/**
 * 
 * @param {string} token 
 * @returns object
 */
const verifyEmail= async(token)=>{
    return jwt.verify(token, process.env.EMAIL_TOKEN);
}




module.exports={
    createAccessToken,
    createRefreshToken,
    createEmailToken,
    verifyPassword,
    hash,
    sendConfirmationMail,
    verifyEmail
}