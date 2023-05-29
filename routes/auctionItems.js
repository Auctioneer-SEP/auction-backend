const express=require('express')
const router=express.Router()
const usersController = require('../controllers/usersController');
const Bid = require("../models/bid")
const User = require("../models/user")
const Product = require("../models/product")

router.post("/product",(req,res)=>{
    Product.create(req.body, function(err, user){
        if(err){
            console.log(err)
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
                status : user.status,
                endtime : user.endtime,
                description: user.description,
                request: true
            });

        })
        


    });
})

router.get("/product",(req,res)=>{
    Product.find({},(err,data)=>{
        if(err){
            return res.status(400).send({
                request: false
            });
        }
        res.json(data);
    })
})

router.get("/product/:id",(req,res)=>{
    Product.findOne({_id: req.params.id}, function(err, prod){
            if(err){
                return res.status(400).send({
                    request: false
                });
            }
    User.findOne({_id : prod.postedBy},(err, data)=>{
        return res.json({
            img: prod.img,
            productname: prod.name,
            username: data.username,
            email : data.email,
            id: prod._id,
            price : prod.price,
            description: prod.description,
            endtime : prod.endtime,
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
            
                User.findOne({_id:req.body.userId},(err,user)=>{
                    // console.log(user)
                    if(err){
                        
                        return res.status(400).send({
                            request: false
                        });
                    }
                    Product.findOne({_id : req.body.productId},(err3,prd)=>{
                        if(err3){
                        
                            return res.status(400).send({
                                request: false
                            });
                        }
                        let obj = {
                            request: true,
                            amount : req.body.amount,
                            userId : req.body.userId,
                            username : user.username,
                            productId : req.body.productId,
                            productName : prd.name,
                            productPrice : prd.price
                        }
                        Bid.create(obj, (err2, bid)=>{
                            // if(err2) console.log("here")
                            return res.json(bid)
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
                        productId : data.productId,
                        productName : data.name,
                        productPrice : data.price
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