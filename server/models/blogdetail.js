const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogdetailSchema = new Schema({
    blogHeading: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true,
        // default: Date.now
    },
    writtenBy:{
        type: String,
        required: true,
    },
    blogContent:{
        type: String,
        required: true
    },
    ytLink:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('blogdetail', blogdetailSchema)