

const { SaveProduct, AllProducts, SingleProduct } = require('../model/Product.Model')



/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @returns 
 */
const Upload = async (req, res) => {
    try {
        // let { user_id, files: [{ filename: filename1 }, { filename: filename2 }, { filename: filename3 }], body: { product_name, product_description, product_price,product_category } } = req;
        let { user_id, body: { image_1, image_2, image_3, product_name, product_description, product_price, product_category } } = req;
        try {
            const io = req.io;
            let result = await SaveProduct(user_id, image_1, image_2, image_3, product_name, product_description, product_price, product_category);
            console.log(result);
            console.log('successfully inserted');

            //when new product gets added emi event
            io.on("connection", (socket) => {
                io.removeAllListeners();
                socket.broadcast.emit("new-product", "New product available !");
            })

            return res.status(200).json({
                error: false, message: "Uploaded the files successfully"
            });


        } catch (error) {
            console.log(error);
            throw error;

        }

    } catch (error) {
        console.log(error);
        return res.json({ error: true, message: "Please retry !!" })

    }

    // res.json("upload file route")
}



const getAllProducts = async (req, res) => {
    try {
    //     const io= req.io;
    //    io.on("connection",socket=>{
    //        socket.emit("hello","hello from server")
    //    })
        const data = await AllProducts();
        return res.json(data);
    } catch (error) {
        console.log('get all product controller error: ', error);
        return res.json({ error: true, message: 'can not fetch' });
    }

}


const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await SingleProduct(id);
        if(data.length ===0) throw data;
        res.json(data);
    } catch (error) {
        console.log('get single product error:', error);
        res.json({ error: true, message: 'can not fetch single product' });
    }
}







module.exports = {
    Upload,
    getAllProducts,
    getSingleProduct,

}



