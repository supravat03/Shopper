const util = require('util');
const dbConnection = require('./dbConnect');
const query = util.promisify(dbConnection.query).bind(dbConnection);

/**
 * 
 * @param {string} user_id 
 * @param {string} filename1 
 * @param {string} filename2 
 * @param {string} filename3 
 * @param {string} product_name 
 * @param {string} product_description 
 * @param {string} product_price 
 * @returns saved_result
 */
const SaveProduct=async (user_id,filename1,filename2,filename3,product_name,product_description,product_price,product_category)=>{

    user_id = dbConnection.escape(user_id);

    filename1 = dbConnection.escape(filename1);
    filename2 = dbConnection.escape(filename2);
    filename3 = dbConnection.escape(filename3);

    product_name = dbConnection.escape(product_name);
    product_description = dbConnection.escape(product_description);
    product_price = dbConnection.escape(product_price);
    product_category = dbConnection.escape(product_category);

    const sql = `INSERT INTO product_info (product_name,product_description,product_price,image_1,image_2,image_3,user_id,product_category) VALUES (${product_name},${product_description},${product_price},${filename1},${filename2},${filename3},'${user_id}',${product_category})`;
    const result=await query(sql);


    return result;

}

/**
 * 
 * @returns all_product_info
 */
const AllProducts=async()=>{
    const sql='SELECT * FROM product_info';
    const result= await query(sql);
    return result;
}


const SingleProduct=async(id)=>{
    const sql= `SELECT * FROM product_info WHERE product_id=${id}`;
    const data= await query(sql);
    return data;

}


module.exports={
    SaveProduct,
    AllProducts,
    SingleProduct
}