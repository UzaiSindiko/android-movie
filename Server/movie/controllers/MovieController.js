const Movie = require('../model/Movie')

class MovieController {

    static create(req, res, next){
        const {title, overview, poster_path, desc, trailer, popularity, tags} = req.body
        Movie.create({title, overview, poster_path, desc, trailer, popularity, tags})
            .then(movie => {
                res.status(201).json(movie)
            })
            .catch(next)
    }

    static find(req, res, next){
        Movie.find({}).sort({ updatedAt: -1 })
            .then(movies => {
                res.status(200).json(movies)
            })
            .catch(next)
    }

    static findById(req, res, next){
        const { id } = req.params
        Movie.findById(id)
            .then(movie => {
                res.status(200).json(movie)
            })
            .catch(next)
    }

    static update(req, res, next){
        const { id } = req.params
        const {title, overview, poster_path, desc, trailer, popularity, tags} = req.body
        Movie.findByIdAndUpdate(id, {title, overview, poster_path, desc, trailer, popularity, tags}, { omitUndefined: true, new: true })
            .then(movie => {
                res.status(200).json(movie)
            })
            .catch(next)
    }

    static delete(req, res, next){
        const { id } = req.params
        Movie.findByIdAndDelete(id)
            .then(movie => {
                res.status(200).json(movie)
            })
            .catch(next)
    }

    static search(req, res, next) {
        const { q } = req.query       
        Movie.find({
                $or: [   
                    {
                        title: {
                            $regex: `${q}`, $options: 'i'
                        }
                    },
                    {
                        desc: {
                            $regex: `${q}`, $options: 'i'
                        }
                    },
                    {
                        tags: {
                            $regex: `${q}`, $options: 'i'
                        }
                    }
                ]
            }).sort({ updatedAt: -1 })
            .then(movies => {
                res.status(200).json(movies)
            })
            .catch(next)
    }

}

module.exports = MovieController
