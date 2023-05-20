const express=require('express')
const router=express.Router()
const usersController = require('../controllers/usersController');

router.get("/",(req,res)=>{
    res.send("Hello")
})

module.exports = router;