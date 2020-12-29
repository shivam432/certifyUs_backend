 const router = require('express').Router();
 const mongoose = require('mongoose');
 const Template = require('../models/templates.model');
var path = require('path'); 
var multer = require('multer'); 
  
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, './uploads/') 
    }, 
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
    }
}); 
  
var upload = multer({ storage: storage })

 router.route('/').get((req,res) => {
     Template.find()
      .then(templates => res.json(templates))
      .catch(err => res.status(400).json('error ' + err)); 
 });

 router.post('/add', upload.single('file') ,(req, res, next)=>{
     console.log(req.body.name);
    Template.find({name:req.body.name})
    .exec()
    .then(async template=> {
        if(template.length>1){
            return res.status(409).json({
                message: 'Template already exists'
            })
        }else{
            const add_template= new Template({
                path: req.file.path,
                url:req.file.filename,
                name:req.body.name,
            });
            add_template.save()
            .then(result=>{
                console.log(result);
                res.status(201).json({
                    message:'Template Created'
                });
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
 });

 router.post('/delete', (req,res,next)=>{
     console.log(req.body.name);
     Template.findOneAndRemove({name:req.body.name},
        function(err,docs){
            if(err){
                console.log(err);
            }else{
                res.status(201).json({
                    message:'Removed User'
                });
                console.log("Removed User: ", docs);
            }
        }
        )
 });



 module.exports = router;
