import React, { useState, useEffect } from 'react';
import { BackHandler, Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './Components/Routes/Routes';
import GlobalStyleProvider from './GlobalStyleProvider';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { ConnectivityProvider } from './ConnectivityContext';
import NoInternetPopup from './NoInternetPopup';
import { DataProvider } from './DataContext';
import { AuthProvider } from './AuthProvider';
import { BackHandlerProvider } from './BackHandler';

function App(): React.JSX.Element {



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BackHandlerProvider>
      <ConnectivityProvider>
        <AuthProvider>
          <GlobalStyleProvider>
            <DataProvider>
              <AlertNotificationRoot>
                <Routes />
                <NoInternetPopup />

                {/* Exit Confirmation Modal */}
               
              </AlertNotificationRoot>
            </DataProvider>
          </GlobalStyleProvider>
        </AuthProvider>
      </ConnectivityProvider>
      </BackHandlerProvider>
    </GestureHandlerRootView>
  );
}


export default App;
