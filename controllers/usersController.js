const User = require('../models/user');
const jwt = require('jsonwebtoken');

// get the sign up data
module.exports.signUp = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.status(401).send({
            request: false
        });
    }
    
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.status(400).send({
                request: false
            });
        }
        
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    return res.status(400).send({
                        request: false
                    });
                }

                return res.json({
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    phone: user.phone,
                    id: user._id,
                    profileUrl: user.profileUrl,
                    request: true
                });
            });
        }
        else{
            return res.status(400).send({
                message: false
            });
        }
    })
};

// sign in the user
module.exports.signIn = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.status(400).send({
                request: false
            });
        }

        if(!user || user.password != req.body.password){
            return res.status(401).json({ 
                request: false
            });
        }

        return res.json({
            email: user.email,
            name: user.name,
            username: user.username,
            phone: user.phone,
            id: user._id,
            profileUrl: user.profileUrl,
            request: true
        });
    })
};

// user profile update
module.exports.update = function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
        if(err){
            return res.status(400).send({
                request: false
            });
        }

        return res.json({
            email: req.body.email,
            name: req.body.name,
            username: req.body.username,
            phone: req.body.phone,
            id: user._id,
            profileUrl: req.body.profileUrl,
            request: true
        });
    });
}