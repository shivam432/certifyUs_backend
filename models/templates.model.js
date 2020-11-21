const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema({
    url: {
        type: String
    }
});