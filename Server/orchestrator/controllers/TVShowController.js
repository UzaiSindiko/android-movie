const axios = require('../apis/TVShow')
const Redis = require("ioredis");
const redis = new Redis();

class TVShowController {

    static  async create(req, res, next){
        const {title, overview, poster_path, popularity, tags} = req.body
        const { data } = await axios({
            method: 'post',
            url: '/',
            data: {title, overview, poster_path, popularity, tags}
        })
        res.status(201).json(data)
    }

    static async find(req, res, next){
       const dataRedis = await redis.get('tvshows')
       if(dataRedis) res.status(200).json(JSON.parse(dataRedis))
       else {
        const { data } = await axios({
               method: 'get',
               url: '/',
        })
            await redis.set('tvshows', JSON.stringify(data))
            res.status(200).json(data)
        }
    }

    static async findById(req, res, next){
        const { id } = req.params
        const dataRedis = await redis.get(`tvshow:${id}`)
        if(dataRedis) res.status(200).json(JSON.parse(dataRedis))
        else {
        const { data } = await axios({
                method: 'get',
                url: `/${id}`,
            })
            await  redis.set(`tvshow:${id}`, JSON.stringify(data))
            res.status(200).json(data)

        }
     }

    static async update(req, res, next){
        const { id } = req.params
        const {title, overview, poster_path, popularity, tags} = req.body
        const { data } = await axios({
            method: 'patch',
            url: `/${id}`,
            data : {title, overview, poster_path, popularity, tags}
        })
        await redis.del(`tvshow:${id}`)
        res.status(200).json(data)
    }

    static async delete(req, res, next){
        const { id } = req.params
        const {title, overview, poster_path, popularity, tags} = req.body
        const { data } = await axios({
            method: 'delete',
            url: `/${id}`,
            data : {title, overview, poster_path, popularity, tags}
        })
        await redis.del(`tvshow:${id}`)
        res.status(200).json(data)
    }
}

module.exports = TVShowController
