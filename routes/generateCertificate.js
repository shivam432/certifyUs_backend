const router = require('express').Router();
var multer = require('multer');
const fs= require('fs');
const parse = require('csv-parse');
var Jimp = require('jimp');

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
        csvData.map(async(data)=> {
           console.log(data[0]); 
           const image = await Jimp.read(req.body.template_url);

           const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
            image.print(font, 1000, 710, data[0]);
           });
          
          const font1 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
            image.print(font, 1000, 1160, "jerry otam");
          });

          const font2 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(font => {
            image.print(font, 1000, 1260, "President");
          });

          image.write("uploads/"+data[1]+".png");
        })
    })
    }); 

module.exports = router;        