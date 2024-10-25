import React, { useContext } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { ConnectivityContext } from './ConnectivityContext';
import { NoInterNetIcon } from './SvgIcons';

const NoInternetPopup = () => {
  const { isConnected } = useContext(ConnectivityContext);

  return (
    <Modal
      visible={!isConnected}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <NoInterNetIcon/>
          <Text style={styles.modalText}>No Internet Connection</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
     fontFamily:'Roboto-Regular',
    color:"#0C1421"
  },
});

export default NoInternetPopup;