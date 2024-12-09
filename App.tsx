import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './Components/Routes/Routes';
import GlobalStyleProvider from './GlobalStyleProvider';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { ConnectivityProvider } from './ConnectivityContext';
import NoInternetPopup from './NoInternetPopup';
import { DataProvider } from './DataContext';
import { AuthProvider } from './AuthProvider';
import withScreenshotProtection from './ScreenProtection';
import withBackgroundProtection from './BackgroundProtection';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConnectivityProvider>
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
      </ConnectivityProvider>
    </GestureHandlerRootView>
  );
}

// Wrap App component with the HOC
export default withBackgroundProtection((App));
