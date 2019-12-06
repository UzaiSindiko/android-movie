const { gql } = require('apollo-server')
const axios = require('../apis/tvshowAPI')

const typeDefsTVShow = gql`
  type TVShow {
    _id: String,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  extend type Query {
    tvshows: [TVShow],
    tvshow (id: String) : TVShow
  }

  extend type Mutation {
    createTvshow (title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : TVShow,
    updateTvshow (id: String, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : TVShow,
    deleteTvshow (id: String) : TVShow
  }
`;

  const resolversTVShow = {
    Query: {
      tvshows: async ()  => {
        const {data}  = await axios({
          method: 'get',
          url:'/'
        }) 
        return data
      },
      tvshow: async (parent, args) => {
        const {data} = await axios({
          method: 'get',
          url: `/${args.id}`
        })
        return data
      } 

    },
    Mutation: {
      createTvshow: async (parent, args) => {
        const { title, overview, poster_path, popularity, tags } = args
        const {data} = await axios({
          method: 'post',
          url: '/',
          data: { title, overview, poster_path, popularity, tags }
        })
        return data
      },
      updateTvshow: async (parent, args) => {
        const { id, title, overview, poster_path, popularity, tags } = args
        const { data } = await axios({
          method: 'patch',
          url: `/${id}`,
          data: { title, overview, poster_path, popularity, tags }
        })
        return data
      },
      deleteTvshow: async (parent, args) => {
        const { id } = args
        const { data } = await axios({
          method: 'delete',
          url: `/${id}`,
        })
        return data
      }
    }
  };

  module.exports = {typeDefsTVShow, resolversTVShow}