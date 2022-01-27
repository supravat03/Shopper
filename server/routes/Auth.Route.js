const express = require('express');
const router = express.Router();

const {Login, Register,ConfirmUser, Logout }= require('../controller/Auth.Controller')
const {GetUser, UpdatePassword, AddAddress, GetAddress, DeleteAddress,UpdateAddress} = require('../controller/User.Controller');
const {verifyTokenMiddleware}= require('./Middlewares/Verify');

router.get('/confirm/:token', ConfirmUser);
router.get('/:id', GetUser);


router.post('/login', Login);
router.post('/register', Register);
router.post('/logout',Logout);
router.post('/addAddress',verifyTokenMiddleware,AddAddress);
router.post('/getAddress',verifyTokenMiddleware,GetAddress);

router.put('/updatePassword',verifyTokenMiddleware, UpdatePassword);
router.put('/address/:id',verifyTokenMiddleware,UpdateAddress);

router.delete('/address/:id',verifyTokenMiddleware,DeleteAddress);


module.exports = router