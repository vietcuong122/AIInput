import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

import {Text} from 'react-native';
import Container from './src/components/Common/Container';
import GlobalProvider from './src/context/Provider';
import Home from './src/apps/AIInput/screens/Home/index';
import AppNavContainer from './src/navigations';

export default function App() {
  return (
    <GlobalProvider>
      <SafeAreaProvider>
        <AppNavContainer />
      </SafeAreaProvider>
    </GlobalProvider>
  );
}
