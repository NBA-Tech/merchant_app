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
import { NoInterNetIcon } from './SvgIcons';

function App(): React.JSX.Element {
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    const backAction = () => {
      setShowExitModal(true); // Show the exit confirmation modal
      return true; // Prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup the listener on unmount
  }, []);

  const handleExitApp = () => {
    BackHandler.exitApp(); // Exit the app
  };

  const handleCloseModal = () => {
    setShowExitModal(false); // Close the modal
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ConnectivityProvider>
        <AuthProvider>
          <GlobalStyleProvider>
            <DataProvider>
              <AlertNotificationRoot>
                <Routes />
                <NoInternetPopup />

                {/* Exit Confirmation Modal */}
                <Modal
                  visible={showExitModal}
                  transparent={true}
                  animationType="slide"
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <NoInterNetIcon/>
                      <Text style={styles.modalText}>Are you sure you want to exit?</Text>
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={[styles.button, styles.cancelButton]}
                          onPress={handleCloseModal}
                        >
                          <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, styles.exitButton]}
                          onPress={handleExitApp}
                        >
                          <Text style={styles.buttonText}>Exit</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </AlertNotificationRoot>
            </DataProvider>
          </GlobalStyleProvider>
        </AuthProvider>
      </ConnectivityProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#000000'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#d3d3d3',
  },
  exitButton: {
    backgroundColor: '#ff5c5c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
