const express=require('express')
const router=express.Router()
const Fav = require("../models/favourite")
const { json } = require('body-parser')


router.get("/:userId",(req,res)=>{
    Fav.find({userId : req.params.userId},(err, bid)=>{
        if(err){
            return res.status(400).send({
                request: false
            });
        }
        // bid.request = true;
        // console.log(bid)
        return res.json(bid)
    })
})
router.post("/",(req,res)=>{
    Fav.create(req.body, (err, bid)=>{
        if(err){
            return res.status(400).send({
                request: false
            });
        }
        // converting json to obj
        var obj = bid.toObject();
        obj.request = true
        console.log(typeof(bid))
        return res.json(
            obj
            )
    })
})
router.delete("/",(req,res)=>{
    Fav.deleteOne({userId : req.body.userId,productId : req.body.productId},
        
        (err,suc)=>{
        if(err){
            return res.status(400).send({
                request: false
            });
        }
        return res.status(200).send({
            request: true
        });
    })
})

module.exports = router;