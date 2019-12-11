const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema ({
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
    desc: {
        type: String
    },
    trailer: {
        type: String
    },
    popularity: {
        type: Number
    },
    tags: {
        type: [String]
    }

})

module.exports = mongoose.model('Movie', movieSchema)