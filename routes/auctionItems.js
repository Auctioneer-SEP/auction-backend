const express=require('express')
const router=express.Router()
const usersController = require('../controllers/usersController');
const Bid = require("../models/bid")
const Product = require("../models/product")


router.get("/",(req,res)=>{
    res.send("Auction")
})

module.exports = router;