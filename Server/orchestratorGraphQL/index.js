if(process.env.NODE_ENV === 'development'){
  require('dotenv').config()
}

const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const { typeDefsMovie, resolversMovie } = require('./Schema/movieSchema')
const {typeDefsTVShow, resolversTVShow} = require('./Schema/tvshowSchema')

const PORT = process.env.PORT

const typeDefs = gql`
  type Query,
  type Mutation
`

const schema = makeExecutableSchema({
  typeDefs : [typeDefs, typeDefsMovie, typeDefsTVShow],
  resolvers: [resolversMovie, resolversTVShow]
})

const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
