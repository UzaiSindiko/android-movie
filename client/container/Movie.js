import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { Text, View, TouchableOpacity, Dimensions, TextInput, ScrollView, Image, ActivityIndicator} from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window')

const GET_MOVIES = gql`
    query{
        movies {
            _id
            title
            poster_path
            popularity
        }
    }
`

const SEARCH_GET_MOVIES = gql`
    query ($q: String) {
        searchMovie ( q: $q ) {
            _id
            title
            poster_path
            popularity
        }
    }
`

export default function Movie({ navigation }) {
    
    const [q, setQ] = useState('')
    const { loading, error, data } = useQuery(GET_MOVIES)
    const search = useQuery(SEARCH_GET_MOVIES, { variables: { q } } )

    function starGen(num){
        let len = Math.floor(num)
        let result = ''
        for (let i=0;i<len;i++) {
            result+= '★'
        }
        return result
    }

    if(!q){
        return (
            <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10 }}>
                <Text style={{ color: '#232323', fontSize: 40, marginTop: '10%', alignSelf: 'flex-start' }} > Movies </Text>
                <View style={{ width: screenWidth, height: "10%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10 }}>
                 <AntDesign name="menufold" size={32} color="#4287f5" />
                 <TextInput
                     style={{ height: 40, backgroundColor: '#dfdfdf', width: '80%', borderRadius: 10, paddingHorizontal: 10 }}
                     onChangeText={text => setQ(text)}
                     value={q}
                     placeholder="Search..."
                 />
                </View>
     
                 <ScrollView>
                 {/* LATEST MOVIE */}
                     <View style={{ width: screenWidth }}>
                         <Text style={{ fontSize: 15, color: '#444444', margin: 10, fontWeight: '600', textAlign: 'left'}} >
                             Latest Movie
                         </Text>
                         <ScrollView  horizontal={true} /* CARD CONTAINER*/  style={{ flexDirection: 'row', height: 200 }} >
                            {
                                loading ?
                                <ActivityIndicator size="large" color="#0000ff" />
                                :
                                data.movies.map(v => (
                                    <View key={ v._id } /* CARD */  style={{ width: 100, height: 150, margin: 10}}>
                                        <TouchableOpacity  onPress={() => navigation.navigate('MovieDetail', {id: v._id })}  >
                                            <Image
                                                style={{width: '100%', height: '100%', borderRadius: 10}}
                                                source={{uri: v.poster_path }}
                                            />
                                        </TouchableOpacity>
                                            <Text /* ALBUM TITLE */ style={{ color: '#232323', fontSize: 15, fontWeight: '500' }} >{ v.title }</Text>
                                            <Text style={{ fontSize: 15, color: '#ffd300' }} >{ starGen(v.popularity) }</Text>
                                    </View>
                                ))
                            }
                         </ScrollView>
                     </View>
     
                 {/* TRAILER MOVIE */}
                 <View style={{ width: screenWidth }}>
                         <Text style={{ fontSize: 15, color: '#444444', margin: 10, fontWeight: '600', textAlign: 'left'}} >
                             Trailer
                         </Text>
                         <ScrollView  horizontal={true} /* CARD CONTAINER*/  style={{ flexDirection: 'row', height: 110 }} >
                            {
                                loading ?
                                <ActivityIndicator size="large" color="#0000ff" />
                                :
                                data.movies.map(v => (
                                <View /* CARD */ key={ v._id }  style={{ width: 150, height: 100, margin: 10}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('TrailerMovie', {id: v._id})} >
                                        <Image 
                                            style={{width: '100%', height: '100%', borderRadius: 10}}
                                            source={{uri: v.poster_path }}
                                        />
                                        <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} >
                                            <MaterialCommunityIcons name="play-circle-outline" size={50} color="#fff" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                ))
                            }
                         </ScrollView>
                     </View>
     
                 {/* TRENDING MOVIE */}
                 <View style={{ width: screenWidth }}>
                         <Text style={{ fontSize: 15, color: '#444444', margin: 10, fontWeight: '600', textAlign: 'left'}} >
                             Trending Movie
                         </Text>
                         <ScrollView  horizontal={true} /* CARD CONTAINER*/  style={{ flexDirection: 'row', height: 200 }} >
                         {
                            loading ?
                            <ActivityIndicator size="large" color="#0000ff" />
                            :
                            data.movies.map(v => (
                                <View key={ v._id } /* CARD */  style={{ width: 100, height: 150, margin: 10}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', {id: v._id})} >
                                        <Image 
                                            style={{width: '100%', height: '100%', borderRadius: 10}}
                                            source={{uri: v.poster_path }}
                                        />
                                    </TouchableOpacity>
                                        <Text /* ALBUM TITLE */ style={{ color: '#232323', fontSize: 15, fontWeight: '500' }} >{ v.title }</Text>
                                        <Text style={{ fontSize: 15, color: '#ffd300' }} >{ starGen(v.popularity) }</Text>
                                </View>
                            ))
                        }
                         </ScrollView>
                     </View>
                 </ScrollView>
     
            </View>
         )
    }
    else {
        return (
            <View  style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginBottom: 10, backgroundColor: '#E5E7F2'}}>
                <Text style={{ color: '#232323', fontSize: 40, marginTop: '10%', alignSelf: 'flex-start' }} > Movies </Text>
                <View style={{ width: screenWidth, height: "10%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10 }}>
                 <AntDesign name="menufold" size={32} color="#4287f5" />
                 <TextInput
                     style={{ height: 40, backgroundColor: '#dfdfdf', width: '80%', borderRadius: 10, paddingHorizontal: 10 }}
                     onChangeText={text => setQ(text)}
                     value={q}
                     placeholder="Search..."
                 />
                </View>

                <ScrollView style={{ width: screenWidth, height: '80%'}}>
                   {
                       search.loading ?
                       <ActivityIndicator size="large" color="#0000ff" /> 
                       :
                        search.data.searchMovie.map(v => (
                        <TouchableOpacity key={ v._id } onPress={() => navigation.navigate('MovieDetail', {id: v._id})} >
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
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                       ))
                   }
                </ScrollView>
            </View>
        )
    }
}
