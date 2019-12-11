import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { Text, View, TouchableOpacity, Dimensions, TextInput, ScrollView, Image, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
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


export default function MovieDetail({ navigation }) {
    const { loading, error, data } = useQuery(GET_ONE_TVSHOW,  { variables: { id: navigation.state.params.id } } )

    function starGen(num){
        let len = Math.floor(num)
        let result = ''
        for (let i=0;i<len;i++) {
            result+= '★'
        }
        return result
    }

    if(loading){
        return (
            <View  style={{ width: screenWidth, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return (
        <View  style={{ flex: 1, alignItems: 'center', marginBottom: 10, position: 'relative' }}>
                <View style={{ width: '100%', height: 50, position: 'absolute', marginTop: 30, zIndex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }} >
                    <TouchableOpacity onPress={() =>  navigation.navigate('TVShow')} style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#ffffff50', alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="ios-arrow-round-back" size={32} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ width: screenWidth}} >
                    <Image 
                            style={{width: '100%', height: 200 }}
                            blurRadius={5}
                            source={{uri: data.tvshow.poster_path }}
                    />
                    <TouchableOpacity  onPress={() => navigation.navigate('TrailerTvShow', {id: navigation.state.params.id})}  style={{ width: '100%', height: 200, position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialIcons name="play-circle-outline" size={50} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', backgroundColor: 'white', height: 100, borderRadius: 20, position: 'absolute', marginTop: 180 }} >
                    <View  style={{ width: '100%', height: '100%', flexDirection: 'row', marginLeft: '40%' }}>
                        <View style={{ width: '80%', height: '100%'}} >
                            <Text  style={{ fontWeight: '500', fontSize: 20, color: '#454545' }}>
                                { data.tvshow.title }
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
                            <Text style={{ fontWeight: '700', color: '#FFBC03' }}>
                                { starGen(data.tvshow.popularity) + ` ${data.tvshow.popularity}` } 
                            </Text>
                        </View>
                        <View  style={{ width: '20%', height: '100%' }}>
                            <Text style={{ fontWeight: '800', fontSize: 15, color: '#FEBB02' }} > 9.0 </Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '30%', height: 150, position: 'absolute', marginTop: 120, alignSelf: 'flex-start', marginLeft: 20 }} >
                    <Image 
                        style={{width: '100%', height: '100%', borderRadius: 10 }}
                        source={{uri: data.tvshow.poster_path }}
                    />
                </View>
                <ScrollView style={{ width: '100%', height: '100%', marginTop: 100 }}>
                    <View style={{ width: '100%', height: '100%', paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 35, color: '#232323'}}>
                            Introduction
                        </Text>
                        <Text style={{ color: '#555555' }}>
                           {data.tvshow.desc}
                        </Text>
                        <View  style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                            <TouchableOpacity>
                                <Text style={{ backgroundColor: '#EAEAEA', fontWeight: '500', color: 'grey', paddingHorizontal: 30, paddingVertical: 15, fontSize: 15, borderRadius: 10 }} >
                                    Collect
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={{ backgroundColor: '#FFBC03',color: '#efefef'  ,fontWeight: '500', paddingHorizontal: 50, paddingVertical: 15, fontSize: 15, borderRadius: 10 }} >
                                    Buy Now
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>

        </View>
    )
}
