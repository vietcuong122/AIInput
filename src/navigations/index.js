import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalContext} from '../context/Provider';
import HomeNavigator from './HomeNavigator';

const AppNavContainer = () => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavContainer;
