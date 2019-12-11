import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import Welcome from './container/Welcome'
import Movies from './container/Movie'
import MovieDetail from './container/MovieDetail'
import TrailerMovie from './container/TrailerMovie'
import TVShow from './container/TVShow'
import TVShowDetail from './container/TVShowDetail '
import TrailerTvShow from './container/TrailerTvShow'
import Profile from './container/Profile'
import updateMovie from './container/updateMovie'
import updateTVShow from './container/updateTVShow'

const MovieNav = createStackNavigator({
    Movies : {
        screen: Movies,
        navigationOptions: {
            header: null
        }
    },
    MovieDetail : {
        screen: MovieDetail,
        navigationOptions: {
            header: null
        }
    },
    TrailerMovie : {
        screen: TrailerMovie,
        navigationOptions: {
            header: null
        }
    }
})

const TVShowNav = createStackNavigator({
    TVShow : {
        screen: TVShow,
        navigationOptions: {
            header: null
        }
    },
    TVShowDetail : {
        screen: TVShowDetail,
        navigationOptions: {
            header: null
        }
    },
    TrailerTvShow : {
        screen: TrailerTvShow,
        navigationOptions: {
            header: null
        }
    }
})

const ProfileNav = createStackNavigator({
    Profile : {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    updateMovie : {
        screen: updateMovie,
        navigationOptions: {
            header: null
        }
    },
    updateTVShow : {
        screen: updateTVShow,
        navigationOptions: {
            header: null
        }
    },
})

const mainTabNav = createBottomTabNavigator({
    Movies :{
        screen: MovieNav,
        navigationOptions: {
            tabBarIcon: ({ tintColor })=> {
                return ( <MaterialCommunityIcons name={'movie-roll'} size={20} color={tintColor} /> )
            }
        }
    },
    'TV Show': {
        screen: TVShowNav,
        navigationOptions: {
            tabBarIcon: ({ tintColor })=> {
                return ( <MaterialIcons name={'live-tv'} size={20} color={tintColor} /> )
            }
        }
    },
    Profile: {
        screen: ProfileNav,
        navigationOptions: {
            tabBarIcon: ({ tintColor })=> {
                return ( <FontAwesome name={'user-o'} size={20} color={tintColor} /> )
            }
        }
    },

})



const rootNavigator = createSwitchNavigator({
    mainTabNav,
    Welcome,
})

export default createAppContainer(rootNavigator)
