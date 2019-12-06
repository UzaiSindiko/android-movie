const axios = require('axios')

module.exports = axios.create({
    baseURL: 'http://localhost:3002/tvshows'
})