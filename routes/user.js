const express=require('express')
const Product = require('../models/product')
const Bid = require('../models/bid')
const usersController = require('../controllers/usersController');
const router=express.Router()



router.get("/bid/:userId",(req,res)=>{
    
    Bid
    .aggregate([{
        $lookup: {
            from: "users", // collection name in db
            localField: "userId",
            foreignField: "_id",
            as: "users"
        }
    }]).exec(function(err, students) {
        let arr = 
        students.map(ele =>{
            return {
                firstname : ele.users[0].name,
                username : ele.users[0].username,
                amount : ele.amount,
                id : ele.users[0]._id
            }
        })
        arr = arr.filter(ele => ele.id == req.params.userId)
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