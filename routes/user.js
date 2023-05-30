const express=require('express')
const Product = require('../models/product')
const Bid = require('../models/bid')
const usersController = require('../controllers/usersController');
const router=express.Router()



router.get("/bid/:userId",(req,res)=>{
    
    Bid
    .aggregate([{
        $lookup: {
            from: "products", // collection name in db
            localField: "productId",
            foreignField: "_id",
            as: "prods"
        }
    }]).exec(function(err, students) {
        let arr = 
        students.map(ele =>{
            return {
                productName : ele.prods[0].name,
                price : ele.prods[0].price,
                amount : ele.amount,
                status : ele.prods[0].status,
                id : ele.prods[0]._id,
                userId : ele.userId
            }
        })
        arr = arr.filter(ele => ele.userId == req.params.userId) 
        arr.sort((a,b)=> b.amount - a.amount)
        res.json(arr);
        // console.log(students[0].prods)
    });


    // })
})

router.get("/product/:userId",(req,res)=>{
    Product.find({postedBy : req.params.userId}, (err, product)=>{
        if(err){
            return res.status(400).send({
                request: false
            });
        }
       return res.json(product)

    })
})

router.post('/update/:id', usersController.update);

router.post('/delete-account/:id', usersController.deleteAccount)

module.exports = router;