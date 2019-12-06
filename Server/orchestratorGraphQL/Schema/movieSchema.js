const { gql } = require('apollo-server')
const axios = require('../apis/movieAPI')

const typeDefsMovie = gql`
  type Movie {
    _id: String,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  extend type Query {
    movies: [Movie],
    movie (id: String) : Movie
  }

  extend type Mutation {
    createMovie (title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : Movie,
    updateMovie (id: String, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : Movie,
    deleteMovie (id: String) : Movie
  }
`;

  const resolversMovie = {
    Query: {
      movies: async ()  => {
        const {data}  = await axios({
          method: 'get',
          url:'/'
        }) 
        return data
      },
      movie: async (parent, args) => {
        const {data} = await axios({
          method: 'get',
          url: `/${args.id}`
        })
        return data
      } 

    },
    Mutation: {
      createMovie: async (parent, args) => {
        const { title, overview, poster_path, popularity, tags } = args
        const {data} = await axios({
          method: 'post',
          url: '/',
          data: { title, overview, poster_path, popularity, tags }
        })
        return data
      },
      updateMovie: async (parent, args) => {
        const { id, title, overview, poster_path, popularity, tags } = args
        const { data } = await axios({
          method: 'patch',
          url: `/${id}`,
          data: { title, overview, poster_path, popularity, tags }
        })
        return data
      },
      deleteMovie: async (parent, args) => {
        const { id } = args
        const { data } = await axios({
          method: 'delete',
          url: `/${id}`,
        })
        return data
      }
    }
  };

  module.exports = {typeDefsMovie, resolversMovie}