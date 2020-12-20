const router = require('express').Router();

let Customers = require('../models/customers.model');
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
    Customers.find()
     .then(templates => res.json(templates))
     .catch(err => res.status(400).json('error ' + err)); 
});

router.route('/:email').get((req,res,next) => {
    const id = req.params.email;
    Customers.find({ email: id })
     .then(templates => res.json(templates))
     .catch(err => res.status(400).json('error ' + err)); 
});

router.post('/add', upload.single('image'), (req, res, next) => { 
   const newAdmin = new Customers({
       image:req.file.filename,
       name:req.body.name,
       email:req.body.email,
       certificates:[],
   });
   newAdmin.save()
   .then(() => res.json('Customer added !'))
   .catch(err => res.status(400).json('Error: ' + err));
   });

 router.post('/updateProfilePicture', upload.single('image'),(req, res, next) =>{
    Customers.findOneAndUpdate({ email: req.body.email }, {
         image:req.file.filename
    }, {new:true}).then((user) => {
        if (user) {
            console.log('Image added');
        } else {
            console.log('No user exist');
        }
    }).catch((err) => {
        reject(err);
    })
    .then(() => res.json('Customer Image added !'))
    .catch(err => res.status(400).json('Error: ' + err));
 })  

 router.post('/update_profile',(req,res,next) =>{
        Customers.findOneAndUpdate({ email: req.body.email }, {
            name:req.body.name
    }, {new:true}).then((user) => {
        if (user) {
            console.log('name updated');
        } else {
            console.log('No user exist');
        }
    }).catch((err) => {
        reject(err);
    })
    .then(() => res.json('Profile updated !'))
    .catch(err => res.status(400).json('Error: ' + err));
 })

module.exports = router;
