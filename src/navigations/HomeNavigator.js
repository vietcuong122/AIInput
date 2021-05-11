import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import AIInput from '../apps/AIInput/screens/Home';
import {AI_INPUT_SCREEN, HOME_SCREEN} from '../constants/routeName';
import colors from '../assets/theme/colors';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName={AIInput}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <HomeStack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}></HomeStack.Screen>
      <HomeStack.Screen
        name={AI_INPUT_SCREEN}
        component={AIInput}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
