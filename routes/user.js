const router = require('express').Router();

const User = require('../models/user.model');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup',(req,res,next)=>{
       User.find({email:req.body.email})
         .exec()
         .then(user =>{
             if(user.length >= 1){
                    return res.status(409).json({
                        message: 'Mail already exists'
                    })
             }
             else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email:req.body.email,
                            role:req.body.role,
                            password:hash,
                            });
                            user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message:'User created'
                                });
                            })
                            .catch(err =>{
                                res.status(500).json({
                                    error:err
                                });
                            });
                    }
               })
             }
         })
})

router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                role: user[0].role,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              role: user[0].role,
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.route('/').get((req,res) => {
    User.find()
     .then(templates => res.json(templates))
     .catch(err => res.status(400).json('error ' + err)); 
});


router.post('/updatePassword', (req, res, next) => {
  bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err){
        return res.status(500).json({
            error: err
        })
    }
    else {
      User.findOneAndUpdate({ email: req.body.email }, {
        password:hash
          }, {new:true}).then((user) => {
              if (user) {
                  console.log('password updated');
              } else {
                  console.log('No user exist');
              }
          }).catch((err) => {
              reject(err);
       })
       .then(() => res.json('Password updated !'))
       .catch(err => res.status(400).json('Error: ' + err));
      }
    })
 });


module.exports = router;