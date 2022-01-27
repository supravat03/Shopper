
require('dotenv').config();
const {createAccessToken, verifyRefreshToken}= require('../Helper')


/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
const RefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    // console.log("refresh token route", refreshToken);
    //check if refresh_token exist
    if (!refreshToken) return res.json({ access_token: '' });

    //if exist verify it
    try {
        const verifiedToken =await verifyRefreshToken(refreshToken);
        // console.log(verifiedToken );
        const { user_id} = verifiedToken;
        const newAccess_token =await createAccessToken(user_id);
        // console.log("newAccessToken",newAccess_token);
        res.json({ access_token: newAccess_token });

    } catch (error) {
        console.log(error);
        res.json({error:true, message: 'Invalid Refresh Token' });
    }


}


module.exports = {
    RefreshToken
}