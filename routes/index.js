const express=require('express')
const router=express.Router()

router.get("/",(req,res)=>{
    res.send("Hello")
});

router.use("/auction", require("./auctionItems"));

router.use('/auth', require("./auth"));

module.exports = router;