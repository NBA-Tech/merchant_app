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
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { ConnectivityProvider } from './ConnectivityContext';
import NoInternetPopup from './NoInternetPopup';

function App(): React.JSX.Element {
  return (
    <ConnectivityProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GlobalStyleProvider>
        <AlertNotificationRoot>
          <Routes />
          <NoInternetPopup />
        </AlertNotificationRoot>
        </GlobalStyleProvider>
      </GestureHandlerRootView>
    </ConnectivityProvider>


  );
}


export default App;
