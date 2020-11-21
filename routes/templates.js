 const router = require('express').Router();

 let Template = require('../models/templates.model');

 router.route('/').get((req,res) => {
     Template.find()
      .then(templates => res.json(templates))
      .catch(err => res.status(400).json('error ' + err)); 
 });

 router.route('/add').post((req,res)=>{
     const url =req.body.url;

     const newTemplate = new Template({url});

     newTemplate.save()
     .then(() => res.json('Template added !'))
     .catch(err => res.status(400).json('Error: ' + err));

 });

 module.exports = router;
