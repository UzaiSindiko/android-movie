const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tvshowSchema = new Schema ({
    title: {
        type: String,
        required:[true, 'title is reqiured']
    },
    overview:{
        type: String,
    },
    poster_path: {
        type: String
    },
    popularity: {
        type: Number
    },
    tags: {
        type: [String]
    }

})

module.exports = mongoose.model('TVShow', tvshowSchema)