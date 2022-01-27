const util = require('util');

const { hash } = require('../Helper')
const saltRounds = 10;

const dbConnection = require('./dbConnect');
const query = util.promisify(dbConnection.query).bind(dbConnection);

// dbConnection.connect(err => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Database Connected !");
//     }
// });


/**
 * 
 * @param {string} email 
 * @returns {array} user_data
 */
const findUserByEmail = async (email) => {
    try {
        email = dbConnection.escape(email);
        const sql = `SELECT * FROM user_info WHERE email=${email}`;
        const result = await query(sql);
        return result

    } catch (error) {
        console.log(error);
    }


}

const findUserByID = async (user_id) => {
    try {
        user_id = dbConnection.escape(user_id);
        const sql = `SELECT * FROM user_info WHERE user_id=${user_id}`;
        const result = await query(sql);
        return result;

    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {string} fullName 
 * @param {string} email 
 * @param {string} password 
 * @returns {object} new_user
 */
const insertUser = async (fullName, email, password) => {
    try {
        fullName = dbConnection.escape(fullName);
        email = dbConnection.escape(email);
        // password = dbConnection.escape(password);
        // new user=> insert into database after hashing the plain password
        const hashPassword = await hash(password, saltRounds);
        const sql = `INSERT INTO user_info (name,email,password) VALUES (${fullName},${email},'${hashPassword}')`;
        const result = await query(sql);
        return result;
    } catch (error) {
        console.log('insert user model error:',error);
        throw error
    }



}


const confirmedUser = async (email) => {
    try {
        const sql = `UPDATE user_info SET confirmed ="1" WHERE email= "${email}"`;
        const result = await query(sql);
        return result;

    } catch (error) {
        console.log('confirm user model error:',error);
        throw error;
    }


}

/**
 * 
 * @param {string} newPassword 
 * @param {string} user_id 
 * @returns updated_data
 */
const updatePassword = async (newPassword, user_id) => {
    try {
        const hashPassword = await hash(newPassword, saltRounds);
        const sql = `UPDATE user_info SET password = '${hashPassword}' WHERE user_id=${user_id}`;
        const result = await query(sql);
        return result;
    } catch (error) {
        console.log('update password model error:',error);
        throw error;
    }
}

const saveAddress = async (first_name, last_name, house_no, street, pin, state, telephone, user_id ) => {
    try {
        first_name = dbConnection.escape(first_name);
        last_name = dbConnection.escape(last_name);
        house_no = dbConnection.escape(house_no);
        street = dbConnection.escape(street);
        pin = dbConnection.escape(pin);
        state = dbConnection.escape(state);
        telephone = dbConnection.escape(telephone);
        user_id = dbConnection.escape(user_id);

        const sql = `INSERT INTO address_info (first_name, last_name, house_no, street, pin, state, telephone, user_id) VALUES (${first_name},${last_name},${house_no},${street},${pin},${state},${telephone},${user_id})`;
        const result = await query(sql);
        return result;
    } catch (error) {
        console.log('save address model error:',error);
        throw error;
    }

}

const getAllAddress=async(user_id)=>{
    try {
        user_id= dbConnection.escape(user_id);
        const sql= `SELECT * FROM address_info WHERE user_id=${user_id}`;
        const result= await query(sql);
        return result;
        
    } catch (error) {
        console.log('get all address model error:',error);
        throw error;
        
    }
}

const deleteAddressById= async(id)=>{
    try {
        id= dbConnection.escape(id);
        const sql= `DELETE FROM address_info WHERE address_id=${id}`;
        const result= await query(sql);
        return result;
        
    } catch (error) {
        console.log('delete address by id model error:',error);
        throw error;
        
    }
}


const updateAddressById= async(id,first_name, last_name, house_no, street, pin, state, telephone)=>{
    try {
        id= dbConnection.escape(id);
        first_name = dbConnection.escape(first_name);
        last_name = dbConnection.escape(last_name);
        house_no = dbConnection.escape(house_no);
        street = dbConnection.escape(street);
        pin = dbConnection.escape(pin);
        state = dbConnection.escape(state);
        telephone = dbConnection.escape(telephone);

        const sql = `UPDATE address_info set first_name=${first_name}, last_name=${last_name}, house_no=${house_no}, street=${street}, pin=${pin}, state=${state}, telephone=${telephone} WHERE address_id=${id}`;
        const result = await query(sql);
        return result;
    } catch (error) {
        console.log('update address model error:',error);
        throw error;
    }

}



module.exports = {
    findUserByEmail,
    findUserByID,
    insertUser,
    confirmedUser,
    updatePassword,
    saveAddress,
    getAllAddress,
    deleteAddressById,
    updateAddressById
}