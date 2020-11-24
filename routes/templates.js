 const router = require('express').Router();

 let Template = require('../models/templates.model');

var fs = require('fs'); 
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

//  router.route('/add').post((req,res)=>{
//      const url =req.body.url;

//      const newTemplate = new Template({url});

//      newTemplate.save()
//      .then(() => res.json('Template added !'))
//      .catch(err => res.status(400).json('Error: ' + err));

//  });

 // Uploading the image 
router.post('/add', upload.single('image'), (req, res, next) => { 
    const newTemplate = new Template({
        url:req.file.path,
        img: { 
                data: fs.readFileSync(path.join('/home/sanskar/Desktop/DBMS_project_backend' + '/uploads/' + req.file.filename)), 
                contentType: 'image/png'
            } 
    });
    newTemplate.save()
    .then(() => res.json('Template added !'))
    .catch(err => res.status(400).json('Error: ' + err));
    });

 module.exports = router;
