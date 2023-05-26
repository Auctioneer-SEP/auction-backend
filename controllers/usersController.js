const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

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
            bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                req.body.password = hash;
                
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

        bcrypt.compare(req.body.password, user.password).then(function(result){
            if(result){
                return res.json({
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    phone: user.phone,
                    id: user._id,
                    profileUrl: user.profileUrl,
                    request: true
                });
            }
            
            return res.status(401).json({ 
                request: false
            });
        });
    })
};

// user profile update
module.exports.update = function(req, res){

    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        req.body.password = hash;

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
    });
}