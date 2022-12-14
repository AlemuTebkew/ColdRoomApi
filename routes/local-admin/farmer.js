var express = require('express');
const { getFarmers,getFarmerProduct, searchFarmer } = require('../../controllers/local-admin/farmer');
const { getFarmerBalance } = require('../../controllers/local-admin/farmer-balance')
const { getFarmerRent } = require('../../controllers/local-admin/farmer-rent')

var router = express.Router();

router.get('/',getFarmers)

router.use('/balances/:id',getFarmerBalance)
router.use('/rents/:id',getFarmerRent)
router.get('/products/:id',  getFarmerProduct);
router.get('/search',  searchFarmer);

module.exports=router