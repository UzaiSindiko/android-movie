import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Movies from './container/Movies'

const rootNavigator = createStackNavigator({
    Movies
})

export default createAppContainer(rootNavigator)