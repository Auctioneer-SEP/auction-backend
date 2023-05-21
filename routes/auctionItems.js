const express=require('express')
const router=express.Router()
const usersController = require('../controllers/usersController');
const Bid = require("../models/bid")
const User = require("../models/user")
const Product = require("../models/product")

router.post("/product",(req,res)=>{
    Product.create(req.body, function(err, user){
        if(err){
            return res.status(400).send({
                request: false
            });
        }
        User.findOne({_id: req.body.postedBy}, function(err, data){
            if(err){
                return res.status(400).send({
                    request: false
                });
            }

            return res.json({
                img: user.img,
                productname: user.name,
                username: data.username,
                email : data.email,
                id: user._id,
                price : user.price,
                description: user.description,
                request: true
            });

        })
        


    });
})


router.get("/product/:id",(req,res)=>{
    Product.findOne({_id: req.params.id}, function(err, user){
            if(err){
                return res.status(400).send({
                    request: false
                });
            }
    User.findOne({postedBy : user.postedBy},(err, data)=>{
        return res.json({
            img: user.img,
            productname: user.name,
            username: data.username,
            email : data.email,
            id: user._id,
            price : user.price,
            description: user.description,
            request: true
        });
    })
            

        })
        


    
})

router.post("/bid",(req,res)=>{
    Bid.findOne({userId : req.body.userId},(err1,data)=>{
        if(err1){
            return res.status(400).send({
                request: false
            });
        }
        
        if(!data){
            Bid.create(req.body, (err2, bid)=>{
               
                if(err2){
                    return res.status(400).send({
                        request: false
                    });
                }
                User.findOne({_id:bid.userId},(err,user)=>{
                    // console.log(user)
                    if(err){
                        return res.status(400).send({
                            request: false
                        });
                    }
                    return res.json({
                        request: true,
                        amount : bid.amount,
                        userId : bid.userId,
                        username : user.username,
                        productId : bid.productId
                    })
                })
                
            })
        }
        else{
            // if user already exists 
            Bid.updateOne(
                {userId : data.userId, productId : data.productId},
                {amount : req.body.amount},(err,updt)=>{
                if(err){
                    return res.status(400).send({
                        request: false
                    });
                }
                // console.log(data.userId)
                User.findOne({_id:data.userId},(err,user)=>{
                    console.log(user)
                    if(err){
                        return res.status(400).send({
                            request: false
                        });
                    }
                    return res.json({
                        request: true,
                        amount : req.body.amount,
                        userId : data.userId,
                        username : user.username,
                        productId : data.productId
                    })
                })
                
            })
        } 
        // return res.status(400).json({request:"false"});
    })
    
})

router.get("/bid/:productId",(req,res)=>{
    Bid.find({productId: req.params.productId}, (err, product)=>{
        if(err){
            return res.status(400).send({
                request: false
            });
        }
       return res.json(product)

    })
})

router.get("/",(req,res)=>{
    res.send("Auction")
})

module.exports = router;