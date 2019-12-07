import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { View, Text, TextInput, ScrollView } from 'react-native'

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

const CREATE_MOVIE= gql`
    mutation ($title: String, $overview: String, $poster_path: String, $popularity: Float, $tags: [String]) {
        createMovie (title : $title, overview : $overview, poster_path : $poster_path, popularity : $popularity, tags : $tags){
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

const DELETE_MOVIE = gql`
    mutation ($id: String){
        deleteMovie(id: $id){
            _id,
            title,
        }
    }

`


export default function Movies() {
    const { loading, error, data } = useQuery(GET_MOVIES)
    const [addMovie, create] = useMutation(CREATE_MOVIE)
    const [delMovie, deleteMovie] = useMutation(DELETE_MOVIE) 
    
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [popularity, setPopularity] = useState('')
    const [tag, setTag] = useState('')

    function handleSubmit() {
        addMovie({
            variables: {
                title,
                overview,
                poster_path,
                popularity: Number(popularity)
            },
             update(cache, { data: { createMovie } }) {
              const { movies } = cache.readQuery({ query: GET_MOVIES });
              cache.writeQuery({
                query: GET_MOVIES,
                data: { movies: [...movies, createMovie] }
              });
            }
        })
    }

    function handleDel(id) {
        delMovie({
            variables: {
                id
            },
            update(cache, { data: { movies } }) {
                cache.writeQuery({
                  query: GET_MOVIES,
                  data: { movies }
                });
              }
        })
        
    }

    return (        
        <ScrollView>
        <View  style={{ flex: 1,  alignItems: 'center', justifyContent: 'center', marginBottom: 300 }}>
            <Text>MATUN BISA TIDAK</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center',  flexDirection: 'column', width: '100%', height: 500 }}>
            {
                loading ? <Text>laoding gan..!!!</Text> : 

                data.movies.map(movie => <Text  onPress={() => handleDel(movie._id)} key={ movie._id } style={{ backgroundColor: 'grey', margin: 5, padding: 10, borderRadius: 10}} > { movie.title}  </Text> )
                
            }
            </View>

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', padding: 10 }}
            onChangeText={text => setTitle(text)}
            value={title}
            placeholder="title"
        />

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', padding: 10 }}
            onChangeText={text => setOverview(text)}
            value={overview}
            placeholder="overview"
        />

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', padding: 10 }}
            onChangeText={text => setPoster_path(text)}
            value={poster_path}
            placeholder="poster_path"
        />

        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', padding: 10 }}
            onChangeText={text => setPopularity(text)}
            value={popularity}
            placeholder="popularity"
        />
        
        <Text onPress={ handleSubmit } > touch me </Text>
        </View>
        </ScrollView>
    )
}
