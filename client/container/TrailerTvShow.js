import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import { Text, View, TouchableOpacity, Dimensions, TextInput, ScrollView, Image, FlatList, SafeAreaView, WebView, ActivityIndicator} from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

const GET_ONE_TVSHOW = gql`
    query ( $id: String ){
        tvshow (id: $id) {
            _id
            title
            poster_path
            desc
            trailer
            popularity
        }
    }
` 

export default function TrailerMovie({ navigation }) {
    const { loading, error, data } = useQuery(GET_ONE_TVSHOW,  { variables: { id: navigation.state.params.id } } )

    const [uri, setUri] = useState('')
    useEffect(() => {
        if(!loading){
            const result = data.tvshow.trailer.split('=')[1]
            setUri(result)
        }
    }, [loading])

    return (
        <ScrollView>
            {loading ?
                <View style={{ width: screenWidth, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
                :
                <View  style={{ flex: 1, width: screenWidth, marginBottom: 10 }}>
                    <View style={{ width: 350, height: 200, marginTop: 25,}} >
                        <WebView
                            originWhitelist={['*']}
                            source={{html: `<iframe width="350" height="200" src="https://www.youtube.com/embed/${uri}"></iframe>`}}
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontSize: 35,fontWeight: '700', color: '#252525' }}>
                            { data.tvshow.title }
                        </Text>
                        <Text style={{ fontSize: 25, color: '#232323'}}>
                            Introduction
                        </Text>
                        <Text style={{ color: '#555555' }}>
                            { data.tvshow.desc }
                        </Text>
                    </View>
                </View>
            }
        </ScrollView>

    )
}