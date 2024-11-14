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
import { DataProvider } from './DataContext';
import { AuthProvider } from './AuthProvider';

function App(): React.JSX.Element {
  return (
    <ConnectivityProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
        <GlobalStyleProvider>
          <DataProvider>
            <AlertNotificationRoot>
              <Routes />
              <NoInternetPopup />
            </AlertNotificationRoot>
          </DataProvider>
        </GlobalStyleProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </ConnectivityProvider>


  );
}


export default App;
