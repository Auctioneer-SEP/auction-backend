const express=require('express')
const router=express.Router()

const Fav = require("../models/favourite")


router.get("/",(req,res)=>{
    res.send("Fav")
})

module.exports = router;