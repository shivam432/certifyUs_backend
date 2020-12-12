const router = require('express').Router();
var multer = require('multer');
const fs= require('fs');
const parse = require('csv-parse');

var upload = multer({dest: './csv/'});

router.post('/create',upload.single('file'), (req, res, next) => { 
    const csvData=[];
    fs.createReadStream(req.file.path)
    .pipe(
        parse({
            delimiter: ';'
        })
    )
    .on('data',function(dataRow){
        csvData.push(dataRow);
    })
    .on('end',function(){
        csvData.map((data)=>{
           console.log(data[0]); 
        })
    })
    });

module.exports = router;        