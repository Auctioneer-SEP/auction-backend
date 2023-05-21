const express=require('express')
const Product = require('../models/product')
const Bid = require('../models/bid')
const router=express.Router()



router.get("/bid/:userId",(req,res)=>{
    Bid.find({userId: req.params.userId}, (err, product)=>{
        if(err){
            return res.status(400).send({
                request: false
            });
        }
       return res.json(product)

    })
})

router.get("/product/:userId",(req,res)=>{
    Product.find({userId: req.params.userId}, (err, product)=>{
        if(err){
            return res.status(400).send({
                request: false
            });
        }
       return res.json(product)

    })
})

module.exports = router;