const TVShow = require('../model/TVShow')

class TVShowController {

    static create(req, res, next){
        const {title, overview, poster_path, desc, trailer, popularity, tags} = req.body
       TVShow.create({title, overview, poster_path, desc, trailer, popularity, tags})
            .then(tvshow => {
                res.status(201).json(tvshow)
            })
            .catch(next)
    }

    static find(req, res, next){
       TVShow.find({}).sort({ updatedAt: -1 })
            .then(tvshow => {
                res.status(200).json(tvshow)
            })
            .catch(next)
    }

    static findById(req, res, next){
        const { id } = req.params
       TVShow.findById(id)
            .then(tvshow => {
                res.status(200).json(tvshow)
            })
            .catch(next)
    }

    static update(req, res, next){
        const { id } = req.params
        const {title, overview, poster_path, desc, trailer, popularity, tags} = req.body
       TVShow.findByIdAndUpdate(id, {title, overview, desc, trailer, poster_path, popularity, tags}, { omitUndefined: true, new: true })
            .then(tvshow => {
                res.status(200).json(tvshow)
            })
            .catch(next)
    }

    static delete(req, res, next){
        const { id } = req.params
       TVShow.findByIdAndDelete(id)
            .then(tvshow => {
                res.status(200).json(tvshow)
            })
            .catch(next)
    }

    static search(req, res, next) {
        const { q } = req.query       
        TVShow.find({
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
            .then(tvshow => {
                res.status(200).json(tvshow)
            })
            .catch(next)
    }

}

module.exports = TVShowController
