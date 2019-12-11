import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { Text, View, TouchableOpacity, Dimensions, TextInput, ScrollView, Image, FlatList, SafeAreaView, ActivityIndicator} from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window')


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

const GET_TVSHOWS = gql`
    query{
        tvshows {
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
    mutation (  $title: String
                $overview: String
                $poster_path: String
                $desc: String
                $trailer: String
                $popularity: Float
                $tags: [String] ) 
                {
        createMovie (   title : $title
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

const CREATE_TVSHOW= gql`
    mutation (  $title: String
                $overview: String
                $poster_path: String
                $desc: String
                $trailer: String
                $popularity: Float
                $tags: [String] ) 
                {
        createTvshow (   title : $title
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

const DELETE_MOVIE = gql`
    mutation ($id: String){
        deleteMovie(id: $id){
            _id,
            title,
        }
    }
`

const DELETE_TVSHOW = gql`
    mutation ($id: String){
        deleteTvshow(id: $id){
            _id,
            title,
        }
    }
` 


export default function Profile({ navigation }) {
    const movies = useQuery(GET_MOVIES)
    const tvshows = useQuery(GET_TVSHOWS)
    const [addMovie, _createMovie] = useMutation(CREATE_MOVIE)
    const [addTvshow, _createTvshow] = useMutation(CREATE_TVSHOW)
    const [delMovie, deleteMovie] = useMutation(DELETE_MOVIE) 
    const [delTvshow, deleteTvshow] = useMutation(DELETE_TVSHOW) 

    const [page, setPage] = useState('movies')
    const [add, setAdd] = useState('addMovie')

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [desc, setDesc] = useState('')
    const [trailer, setTrailer] = useState('')
    const [popularity, setPopularity] = useState('')
    const [tags, setTags] = useState('')
    const [isNumber, setIsNumer] = useState(true)


    useEffect(() => {
        if(!isNaN(Number(popularity)) && (Number(popularity) >= 0 && Number(popularity) <= 5 || popularity == '') ){
            setIsNumer(true)
        }
        else {
            setIsNumer(false)
        }
    }, [popularity])

    function handleDeleteMovie(id) {
        delMovie({
            variables: {
                id
            },
            update(cache, { data: { deleteMovie } }) {
                const { movies } = cache.readQuery({ query: GET_MOVIES });
                cache.writeQuery({
                  query: GET_MOVIES,
                  data: { movies: movies.filter(v => v._id !== deleteMovie._id ) }
                });
              }
        })
    }

    function handleDeleteTvshow(id) {
        delTvshow({
            variables: {
                id
            },
            update(cache, { data: { deleteTvshow } }) {
                const { tvshows } = cache.readQuery({ query: GET_TVSHOWS });
                cache.writeQuery({
                  query: GET_TVSHOWS,
                  data: { tvshows: tvshows.filter(v => v._id !== deleteTvshow._id ) }
                });
              }
        })
    }

   function handleAddMovie(){
        if(title && overview && poster_path && desc && trailer && popularity && tags){
            addMovie({
                variables: {
                    title,
                    overview,
                    poster_path,
                    desc,
                    trailer,
                    popularity: Number(popularity),
                    tags: tags.split(' ')
                },
                    update(cache, { data: { createMovie } }) {
                    const { movies } = cache.readQuery({ query: GET_MOVIES });
                    cache.writeQuery({
                    query: GET_MOVIES,
                    data: { movies: [...movies, createMovie] }
                    });
                }
            })
            reset()
            setPage('movies') 
        }
    }

    function handleAddTvshow(){
        if(title && overview && poster_path && desc && trailer && popularity && tags){
            addTvshow({
                variables: {
                    title,
                    overview,
                    poster_path,
                    desc,
                    trailer,
                    popularity: Number(popularity),
                    tags: tags.split(' ')
                },
                    update(cache, { data: { createTvshow } }) {
                    const { tvshows } = cache.readQuery({ query: GET_TVSHOWS });
                    cache.writeQuery({
                    query: GET_TVSHOWS,
                    data: { tvshows: [...tvshows, createTvshow] }
                    });
                }
            })
            reset()
            setPage('tvshows') 
        }
    }


    function reset(){
        setTitle('')
        setOverview('')
        setPoster_path('')
        setDesc('')
        setTrailer('')
        setPopularity('')
        setTags('')
    }
    
    if(page == 'movies'){
        return (
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#E5E7F2' }}>
                <View style={{ width: screenWidth * 0.1, height: '100%',justifyContent: 'flex-end', alignItems: 'center', paddingVertical: 20}}>
                    
                    <LinearGradient  colors={['#fff', '#ffff', '#fff', '#eee', '#DEE5FF']} style={{ height: '100%', width: "100%", position: 'absolute', zIndex: -1, borderTopLeftRadius: 50 }} ></LinearGradient>
    
                    <TouchableOpacity >
                        <MaterialCommunityIcons style={{ paddingVertical: 20 }} name={'movie'} size={30} color={'#03a5fc'} />
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress={() => setPage('tvshows') } >
                        <MaterialIcons style={{ paddingVertical: 20 }} name={'live-tv'} size={30} color={'#03a5fc45'} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setPage('favorite') } >
                        <Entypo style={{ paddingVertical: 20 }} name={'star'} size={30} color={'#03a5fc45'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setPage('add') } >
                        <Ionicons style={{ paddingVertical: 20 }} name={'ios-add-circle'} size={30} color={'#03a5fc45'} />
                    </TouchableOpacity>

                </View>
    
                <ScrollView style={{ width: screenWidth * 0.9, height: '100%' }} >
                <View style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 30}}>   

                        {
                            movies.loading ?
                            <ActivityIndicator size="large" color="#0000ff" />
                            :
                            movies.data.movies.map(v => (
                                <TouchableOpacity onPress={() => navigation.navigate('updateMovie', {id: v._id })}  key={ v._id } >
                                    <View style={{ width: screenWidth, height: 150, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'flex-end', marginVertical: 10}}>
                                        <Image 
                                            style={{width: '30%', height: '90%', borderRadius: 10, marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, marginBottom: 10}}
                                            source={{uri: v.poster_path }}
                                        />
                                        <View style={{ position: 'absolute', width: '90%', height: '80%', backgroundColor: 'white', borderRadius: 10, paddingLeft: '40%'}} >
                                            <View  style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                                                <View style={{ width: '80%', height: '100%'}} >
                                                    <Text  style={{ fontWeight: '500', fontSize: 20, color: '#454545' }}>
                                                        { v.title }
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', width: 65, justifyContent: 'space-between' }}>
                                                        <View style={{ width: 30, height: 15, borderRadius: 5, borderWidth: 1, borderColor: '#CCD5F6' }} >
                                                            <Text style={{ textAlign: 'center', color: '#CCD5F6', fontSize: 10 }}>3D</Text>
                                                        </View>
                                                        <View style={{ width: 30, height: 15, borderRadius: 5, borderWidth: 1, borderColor: '#FFCD45' }} >
                                                            <Text style={{ textAlign: 'center', color: '#FFCD45', fontSize: 10 }}>IMAX</Text>
                                                        </View>
                                                    </View>
                                                    <Text style={{ fontSize: 13, color: '#CBCCCC' }}>
                                                        Director: Nates
                                                    </Text>
                                                    <Text style={{ fontSize: 13, color: '#CBCCCC' }}>
                                                        Starring: Uzai / Sindiko
                                                    </Text>
                                                </View>
                                                <View  style={{ width: '20%', height: '100%' }}>
                                                    <Text style={{ fontWeight: '800', fontSize: 15, color: '#FEBB02' }} > { v.popularity } </Text>
                                                    <TouchableOpacity onPress={() => handleDeleteMovie(v._id) }>
                                                        <Ionicons  style={{ paddingVertical: 20 }} name={'md-trash'} size={30} color={'red'} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                            </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
    else if(page == 'tvshows'){
        return (
            <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#E5E7F2' }}>
                <View style={{ width: screenWidth * 0.1, height: '100%',justifyContent: 'flex-end', alignItems: 'center', paddingVertical: 20}}>
                    
                    <LinearGradient  colors={['#fff', '#ffff', '#fff', '#eee', '#DEE5FF']} style={{ height: '100%', width: "100%", position: 'absolute', zIndex: -1, borderTopLeftRadius: 50 }} ></LinearGradient>
    
                    <TouchableOpacity onPress={() => setPage('movies') } >
                        <MaterialCommunityIcons style={{ paddingVertical: 20 }} name={'movie'} size={30} color={'#03a5fc45'} />
                    </TouchableOpacity>
    
                    <TouchableOpacity >
                        <MaterialIcons style={{ paddingVertical: 20 }} name={'live-tv'} size={30} color={'#03a5fc'} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setPage('tvshows') } >
                        <Entypo style={{ paddingVertical: 20 }} name={'star'} size={30} color={'#03a5fc45'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setPage('add') } >
                        <Ionicons style={{ paddingVertical: 20 }} name={'ios-add-circle'} size={30} color={'#03a5fc45'} />
                    </TouchableOpacity>

                </View>
    
                <ScrollView style={{ width: screenWidth * 0.9, height: '100%' }} >
                <View style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 30}}>   

                        {
                            tvshows.loading ?
                            <ActivityIndicator size="large" color="#0000ff" />
                            :
                            tvshows.data.tvshows.map(v => (
                                <TouchableOpacity  onPress={() => navigation.navigate('updateTVShow', {id: v._id })}  key={ v._id } key={ v._id } >
                                    <View style={{ width: screenWidth, height: 150, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'flex-end', marginVertical: 10}}>
                                        <Image 
                                            style={{width: '30%', height: '90%', borderRadius: 10, marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, marginBottom: 10}}
                                            source={{uri: v.poster_path }}
                                        />
                                        <View style={{ position: 'absolute', width: '90%', height: '80%', backgroundColor: 'white', borderRadius: 10, paddingLeft: '40%'}} >
                                            <View  style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                                                <View style={{ width: '80%', height: '100%'}} >
                                                    <Text  style={{ fontWeight: '500', fontSize: 20, color: '#454545' }}>
                                                        { v.title }
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', width: 65, justifyContent: 'space-between' }}>
                                                        <View style={{ width: 30, height: 15, borderRadius: 5, borderWidth: 1, borderColor: '#CCD5F6' }} >
                                                            <Text style={{ textAlign: 'center', color: '#CCD5F6', fontSize: 10 }}>3D</Text>
                                                        </View>
                                                        <View style={{ width: 30, height: 15, borderRadius: 5, borderWidth: 1, borderColor: '#FFCD45' }} >
                                                            <Text style={{ textAlign: 'center', color: '#FFCD45', fontSize: 10 }}>IMAX</Text>
                                                        </View>
                                                    </View>
                                                    <Text style={{ fontSize: 13, color: '#CBCCCC' }}>
                                                        Director: Nates
                                                    </Text>
                                                    <Text style={{ fontSize: 13, color: '#CBCCCC' }}>
                                                        Starring: Uzai / Sindiko
                                                    </Text>
                                                </View>
                                                <View  style={{ width: '20%', height: '100%' }}>
                                                    <Text style={{ fontWeight: '800', fontSize: 15, color: '#FEBB02' }} > { v.popularity } </Text>
                                                    <TouchableOpacity onPress={() => handleDeleteTvshow(v._id) }>
                                                        <Ionicons  style={{ paddingVertical: 20 }} name={'md-trash'} size={30} color={'red'} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                            </TouchableOpacity>
                            ))
                        }
    
                        
    
                    </View>
                </ScrollView>
            </View>
        )
    }
    else {

        return (
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#E5E7F2' }}>
                <View style={{ width: screenWidth * 0.1, height: '100%',justifyContent: 'flex-end', alignItems: 'center', paddingVertical: 20}}>
                    
                    <LinearGradient colors={['#fff', '#ffff', '#fff', '#eee', '#DEE5FF']} style={{ height: '100%', width: "100%", position: 'absolute', zIndex: -1, borderTopLeftRadius: 50 }} ></LinearGradient>
    
                    <TouchableOpacity onPress={() => setPage('movies') } >
                        <MaterialCommunityIcons style={{ paddingVertical: 20 }} name={'movie'} size={30} color={'#03a5fc45'} />
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress={() => setPage('tvshows') } >
                        <MaterialIcons style={{ paddingVertical: 20 }} name={'live-tv'} size={30} color={'#03a5fc45'} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => setPage('favotite') } >
                        <Entypo style={{ paddingVertical: 20 }} name={'star'} size={30} color={'#03a5fc45'} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons style={{ paddingVertical: 20 }} name={'ios-add-circle'} size={30} color={'#03a5fc'} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: screenWidth * 0.9, height: '100%', justifyContent: 'space-around', alignItems: 'center',}}>
                    <View style={{ flexDirection: 'row'}}>
                        {
                            add == 'addMovie' ?
                            <>
                            <Text style={{ fontSize: 35, color: 'black', textDecorationLine: 'underline', marginHorizontal: 5 }} >Movie</Text>
                            <Text onPress={ () => setAdd('addTvshow') } style={{ fontSize: 35, color: 'white', textDecorationLine: 'underline', marginHorizontal: 5 }} >TV Show</Text>
                            </>
                            :
                            <>
                            <Text onPress={ () => setAdd('addMovie') }  style={{ fontSize: 35, color: 'white', textDecorationLine: 'underline', marginHorizontal: 5 }} >Movie</Text>
                            <Text style={{ fontSize: 35, color: 'black', textDecorationLine: 'underline', marginHorizontal: 5 }} >TV Show</Text>
                            </>
                        }
                    </View>
                        <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={{ height: 40, backgroundColor: '#fff', width: '90%' , padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 5}}
                                onChangeText={text => setTitle(text)}
                                value={title}
                                placeholder={"Title"}
                            />
                            <TextInput
                                style={{ height: 40, backgroundColor: '#fff', width: '90%' , padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 5}}
                                onChangeText={text => setOverview(text)}
                                value={overview}
                                placeholder={"overview"}
                            />
                            <TextInput
                                style={{ height: 40, backgroundColor: '#fff', width: '90%' , padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 5}}
                                onChangeText={text => setPoster_path(text)}
                                value={poster_path}
                                placeholder={"poster path"}
                            />
                            <TextInput
                                style={{ height: 40, backgroundColor: '#fff', width: '90%' , padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 5}}
                                onChangeText={text => setDesc(text)}
                                value={desc}
                                placeholder={"desc"}
                            />
                            <TextInput
                                style={{ fontSize: 8 ,height: 40, backgroundColor: '#fff', width: '90%' , padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 5}}
                                onChangeText={text => setTrailer(text)}
                                value={trailer}
                                placeholder={"trailer path, ex: https://www.youtube.com/watch?v=C2yFJaXmdQs"}
                            />
                            <TextInput
                                style={{ height: 40, backgroundColor: '#fff', width: '90%' , padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 5}}
                                onChangeText={text => setPopularity(text)}
                                value={popularity}
                                placeholder={"popularity"}
                            />
                            {
                                !isNumber && <Text style={{color: 'red' }} >Popularity is not Valid Number And Must be Between 0 and 5</Text>
                            }
                            <TextInput
                                style={{ height: 40, backgroundColor: '#fff', width: '90%' , padding: 10, borderBottomColor: 'gray', borderBottomWidth: 1, marginVertical: 5}}
                                onChangeText={text => setTags(text)}
                                value={tags}
                                placeholder={"#tag #movie #uzai"}
                            />
                            
                        </View>
                            {
                                isNumber ?
                                    add == 'addMovie' ?
                                        <Text  onPress={ handleAddMovie } style={{ backgroundColor: '#0398fc', paddingVertical: 15 ,borderRadius: 10, width: '80%', textAlign: 'center', color: 'white' }}>
                                            Add Movie
                                        </Text>
                                        :
                                        <Text  onPress={ handleAddTvshow } style={{ backgroundColor: '#67c93c', paddingVertical: 15 ,borderRadius: 10, width: '80%', textAlign: 'center', color: 'white' }}>
                                            Add TV Show
                                        </Text>
                                :
                                <Text></Text>
                            }
                </View>
        </View>
        )
    }
}
