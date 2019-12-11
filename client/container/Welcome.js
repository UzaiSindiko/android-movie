import React, { useState } from 'react'
import { View, Text, TextInput, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginFrom, setLoginFrom] = useState(true)



    return (
        <View style={{ flex: 1, width: '100%' }}>
        <ImageBackground
          source={ {uri: 'https://images-na.ssl-images-amazon.com/images/I/71rNJQ2g-EL._SY606_.jpg'} }
          style={{  width: '100%', height: '100%'}}>
            <View style={{ width: '100%', height: '100%', backgroundColor: '#00000070', alignItems: 'center', justifyContent: 'center'  }}>
                <Text style={{ color: 'white', padding: '5%', fontSize: 50 }} >Cinema</Text>
                <View style={{ width: '90%', height: '50%', backgroundColor: '#ffffffdd',  borderRadius: 10, alignItems: 'center', justifyContent: 'center'  }}>
                    <Text style={{ fontSize: 45, marginBottom: '5%' }} >{ loginFrom ? 'Login' : 'Register'}</Text>
                    <TextInput
                        style={{ backgroundColor: '#232323', width: '95%', height: '15%', borderRadius: 10, color: 'white', padding: 10 }}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        placeholder="Enter Email"
                    />
                    <TextInput
                        style={{ backgroundColor: '#232323', width: '95%', height: '15%', borderRadius: 10, color: 'white', padding: 10, marginVertical: '5%' }}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        placeholder="Enter Password"
                        secureTextEntry={ true }
                    />
                    <View style={{width: '90%' }} ><Text  onPress={() => setLoginFrom(!loginFrom)  } style={{ color: '#036bfc', textAlign: 'right' }} >{ !loginFrom ? 'Login' : 'Register'}</Text></View>
                </View>
                {
                    loginFrom ? <Text style={{ paddingHorizontal: '40%', paddingVertical: '5%', backgroundColor: '#35bafc', marginTop: '5%', borderRadius: 10 }} > Login </Text>
                    :
                    <Text style={{ paddingHorizontal: '30%', paddingVertical: '5%', backgroundColor: '#4cc211', marginTop: '5%', borderRadius: 10 }} > Register </Text>
                }
            </View>
        </ImageBackground>
      </View>
    )
}
