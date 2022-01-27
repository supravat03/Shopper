const express = require('express')
const router = express.Router();

const {Upload, getAllProducts, getSingleProduct}= require('../controller/Product.Controller');
// const {UploadMiddleware} =require('./Middlewares/Upload');
const {verifyTokenMiddleware} =require('./Middlewares/Verify');

router.post('/upload', [verifyTokenMiddleware],Upload);
router.get('/',getAllProducts);
router.get('/:id',getSingleProduct);

module.exports = router