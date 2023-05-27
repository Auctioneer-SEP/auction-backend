const express=require('express')
const router=express.Router()
const Product = require('../models/product')



router.put("/",(req,res)=>{
   Product.updateOne({_id : req.body.id},
    {status : true,highBid:req.body.userId},
    (err,data)=>{
        if(err){
            return res.status(400).send({
                request: false
            })
        }
        return res.json({request : true});
   })
})


module.exports = router;