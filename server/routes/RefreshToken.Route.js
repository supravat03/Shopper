const express = require('express')
const router = express.Router()

const {RefreshToken}= require('../controller/RefreshToken.Controller')

router.post('/', RefreshToken)


module.exports = router