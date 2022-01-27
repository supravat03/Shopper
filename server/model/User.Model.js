const util = require('util');



const dbConnection = require('./dbConnect');
const query = util.promisify(dbConnection.query).bind(dbConnection);

/**
 * 
 * @param {string} id 
 * @returns user_data
 */
const getUserById = async (id) => {
    id = dbConnection.escape(id);
    const sql = `SELECT * FROM user_info WHERE user_id=${id}`;
    try {
        const data = await query(sql);
        return data[0];

    } catch (error) {
        console.log('get user by Id error:', error);
        throw error;
    }
}

module.exports = {
    getUserById
}