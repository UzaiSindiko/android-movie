import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { Text, View, TouchableOpacity, Dimensions, TextInput, ScrollView, Image, FlatList, SafeAreaView, ActivityIndicator, ImageBackground } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window')

const GET_ONE_TVSHOW = gql`
    query ( $id: String ){
        tvshow (id: $id) {
            _id
            title
            overview
            poster_path
            desc
            trailer
            popularity
            tags
        }
    }
` 


const UPDATE_TVSHOW= gql`
    mutation (  $id: String
                $title: String
                $overview: String
                $poster_path: String
                $desc: String
                $trailer: String
                $popularity: Float
                $tags: [String] ) 
                {
        updateTvshow (   id: $id
                        title : $title
                        overview : $overview
                        poster_path : $poster_path
                        desc: $desc
                        trailer: $trailer
                        popularity : $popularity
                        tags : $tags){
            _id
            title
            overview
            poster_path
            desc
            trailer
            popularity
            tags
        }
    }
`

export default function UpdateTvshow({ navigation }) {
    const { loading, error, data } = useQuery(GET_ONE_TVSHOW,  { variables: { id: navigation.state.params.id  } } )
    const  [updateTvshow, _updateTvshow] = useMutation(UPDATE_TVSHOW,  { variables: { id: navigation.state.params.id  } } )

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [desc, setDesc] = useState('')
    const [trailer, setTrailer] = useState('')
    const [popularity, setPopularity] = useState('')
    const [tags, setTags] = useState('')
    const [isNumber, setIsNumer] = useState(true)

    function handleUpdateTvshow(){
        if(title && overview && poster_path && desc && trailer && popularity && tags && isNumber){
            updateTvshow({
                variables: {
                    title,
                    overview,
                    poster_path,
                    desc,
                    trailer,
                    popularity: Number(popularity),
                    tags: tags.split(' ')
                }
            })
            navigation.navigate('Profile')
        }
    }

    useEffect(() => {
        if(!loading){
            setTitle(data.tvshow.title),
            setOverview(data.tvshow.overview),
            setPoster_path(data.tvshow.poster_path),
            setDesc(data.tvshow.desc),
            setTrailer(data.tvshow.trailer),
            setPopularity(data.tvshow.popularity+''),
            setTags(data.tvshow.tags.join(' '))
        }
    }, [loading])

    useEffect(() => {
        if(!isNaN(Number(popularity)) && (Number(popularity) >= 0 && Number(popularity) <= 5 || popularity == '') ){
            setIsNumer(true)
        }
        else {
            setIsNumer(false)
        }
    }, [popularity])

    if(loading){
        return (
            <View  style={{ width: screenWidth, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return (
        <View style={{ flex: 1, width: screenWidth }}>
        <ImageBackground
          source={ {uri: 'https://images-na.ssl-images-amazon.com/images/I/71rNJQ2g-EL._SY606_.jpg'} }
          style={{  width: '100%', height: '100%'}}>
            <ScrollView>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#00000070', alignItems: 'center', justifyContent: 'center',  }}>
                <Text style={{ color: 'white', padding: '5%', fontSize: 30, marginTop: '15%' }} >Update TV Show</Text>
                <View style={{ width: '90%', height: '80%', backgroundColor: '#ffffffdd',  borderRadius: 10, alignItems: 'center', justifyContent: 'center'  }}>
                    <TextInput
                        style={{ backgroundColor: '#232323', width: '95%', height: '8%', borderRadius: 10, color: 'white', padding: 10, marginVertical: '5%' }}
                        onChangeText={text => setTitle(text)}
                        value={title}
                        placeholder={"Title"}
                    />
                    <TextInput
                        style={{ backgroundColor: '#232323', width: '95%', height: '8%', borderRadius: 10, color: 'white', padding: 10, marginVertical: '5%' }}
                        onChangeText={text => setOverview(text)}
                        value={overview}
                        placeholder={"overview"}
                    />
                    <TextInput
                        style={{ backgroundColor: '#232323', width: '95%', height: '8%', borderRadius: 10, color: 'white', padding: 10, marginVertical: '5%' }}
                        onChangeText={text => setPoster_path(text)}
                        value={poster_path}
                        placeholder={"poster path"}
                    />
                    <TextInput
                        style={{ backgroundColor: '#232323', width: '95%', height: '8%', borderRadius: 10, color: 'white', padding: 10, marginVertical: '5%' }}
                        onChangeText={text => setDesc(text)}
                        value={desc}
                        placeholder={"desc"}
                    />
                    <TextInput
                        style={{ fontSize: 8, backgroundColor: '#232323', width: '95%', height: '8%', borderRadius: 10, color: 'white', padding: 10, marginVertical: '5%' }}
                        onChangeText={text => setTrailer(text)}
                        value={trailer}
                        placeholder={"trailer path, ex: https://www.youtube.com/watch?v=C2yFJaXmdQs"}
                    />
                    <TextInput
                        style={{ backgroundColor: '#232323', width: '95%', height: '8%', borderRadius: 10, color: 'white', padding: 10, marginVertical: '5%' }}
                        onChangeText={text => setPopularity(text)}
                        value={popularity}
                        placeholder={"popularity"}
                    />
                    {
                        !isNumber && <Text style={{color: 'red', textAlign: 'center' }} >Popularity is not Valid Number And Must be Between 0 and 5</Text>   
                    }
                    <TextInput
                        style={{ backgroundColor: '#232323', width: '95%', height: '8%', borderRadius: 10, color: 'white', padding: 10, marginVertical: '5%' }}
                        onChangeText={text => setTags(text)}
                        value={tags}
                        placeholder={"#tag #tvshow #uzai"}
                    />
                </View>
                    <Text onPress={ handleUpdateTvshow } style={{ paddingHorizontal: '30%', paddingVertical: '5%', backgroundColor: '#4cc211', marginTop: '5%', borderRadius: 10, marginBottom: '30%'  }} > Update TV Show </Text>
            </View>
            </ScrollView>
        </ImageBackground>
      </View>
    )
}
