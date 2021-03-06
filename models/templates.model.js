const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema({
    path: {
        type: String
    },
    url: {
        type:String
    },
    name: {
        type:String
    }
});

const Template = mongoose.model('Template',templateSchema);

module.exports = Template;

