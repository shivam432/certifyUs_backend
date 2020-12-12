var Jimp = require("jimp");

var fileName = './uploads/2020-11-27T07-46-51.508ZCertificate1.jpeg';
var imageCaption = 'hey man how you doing';
var loadedImage;

Jimp.read(fileName)
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    })
    .then(function (font) {
        loadedImage.print(font, 1000, 600, imageCaption)
                   .write(fileName);
    })
    .catch(function (err) {
        console.error(err);
    });