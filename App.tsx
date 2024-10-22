/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './Components/Routes/Routes';
import GlobalStyleProvider from './GlobalStyleProvider';

function App(): React.JSX.Element {
  return (
    <GlobalStyleProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Routes/>

      </GestureHandlerRootView>
      </GlobalStyleProvider>


  );
}


export default App;
