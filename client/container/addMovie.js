import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { View, Text } from 'react-native'

const GET_MOVIES = gql`
    query{
        movies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export default function Movies() {
    const { loading, error, data } = useQuery(GET_MOVIES)

    return (
        <View  style={{ flex: 1,  alignItems: 'center', justifyContent: 'center' }}>
            <Text>MATUN BISA TIDAK</Text>
            {
                loading ? <Text>laoding gan..!!!</Text> : <Text> {
                    data.movies.map(movie => <Text key={ movie._id } > { movie.title + '\n' }  </Text> )
                } </Text>
            }

            
        </View>
    )
}
