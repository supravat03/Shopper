const bcrypt = require('bcrypt');


const { createAccessToken, createRefreshToken, verifyPassword, sendConfirmationMail, verifyEmail } = require('../Helper');
const { findUserByEmail,findUserByID, insertUser, confirmedUser, updatePassword, saveAddress, getAllAddress } = require('../model/Auth.Model')



const ConfirmUser = async (req, res) => {
    const { token } = req.params;
    console.log(token);

    try {
        const verifiedToken = await verifyEmail(token);
        const { email } = verifiedToken;
        const result = await confirmedUser(email);
        // return res.json({result:result, confirm:true});
        return res.redirect("http://localhost:3000/login");

    } catch (error) {
        console.log(error);
        return res.json({ confirm: false });
        // res.redirect("http://localhost:3000/api/user/login")

    }
}


const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await findUserByEmail(email);
        // console.log(result[0].password);
        if (result.length === 0) {
            //user doesn't exist
            return res.json({ error: true, message: "User not found" });
        }

        if (!result[0].confirmed) {
            return res.json({ error: true, message: "Please confirm Email" });
        }

        //user exist => check password matches or not
        const userExist = await verifyPassword(password, result[0].password);
        // console.log(userExist);
        if (userExist) {
            // console.log(result[0].user_id);
            const { user_id } = result[0];
            req.user_id=user_id;
            const access_token = await createAccessToken(user_id);
            const refresh_token = await createRefreshToken(user_id);
            res.cookie('refresh_token', refresh_token, { httpOnly: true, path: '/api/refresh_token' });
            return res.json({ access_token: access_token, user_id: user_id, error: false, message: "Login successful" });
        }
        else return res.json({ error: true, message: "Email/Password is wrong !!" });

    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: "Login failed" });
    }


}


const Register = async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log(req.body);


    try {
        let result = await findUserByEmail(email);
        if (result.length > 0) {
            // user alredy exist
            if (result[0].confirmed == '1') {
                return res.json({ error: true, message: "User already exist !!" });
            } else {
                sendConfirmationMail(req);
                return res.json({ error: false, message: "confirmation mail sent !!" });
            }
        }

        //send a confirmation mail
        sendConfirmationMail(req);

        result = await insertUser(fullName, email, password);
        res.json({ error: false, message: "Registration successful, Please confirm your Email" });

    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: "Registration failed",Error:error });

    }
}


/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
const Logout = async (req, res) => {
    try {
        console.log('Log out called');
        res.clearCookie('refresh_token', { path: '/api/refresh_token' });
        return res.json({ error: false, message: "logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400);
    }
}





module.exports = {
    Login,
    Register,
    ConfirmUser,
    Logout

}