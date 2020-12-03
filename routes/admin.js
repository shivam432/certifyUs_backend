const router = require('express').Router();

let Admin = require('../models/admin.model');
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
    Admin.find()
     .then(templates => res.json(templates))
     .catch(err => res.status(400).json('error ' + err)); 
});

router.route('/:email').get((req,res,next) => {
    const id = req.params.email;
    Admin.find({ email: id })
     .then(templates => res.json(templates))
     .catch(err => res.status(400).json('error ' + err)); 
});

router.post('/add', upload.single('image'), (req, res, next) => { 
   const newAdmin = new Admin({
       image:req.file.filename,
       name:req.body.name,
       email:req.body.email,
       certificates:[],
   });
   newAdmin.save()
   .then(() => res.json('Admin added !'))
   .catch(err => res.status(400).json('Error: ' + err));
   });

module.exports = router;
