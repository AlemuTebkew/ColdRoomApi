var express = require('express');
var router = express.Router();
const {Login,Logout}=require('../../controllers/auth/wholesaler');

router.post('/login',  Login);
router.get('/logout',  Logout);
module.exports=router