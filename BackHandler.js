import React, { createContext, useContext, useState, useEffect } from 'react';
import { BackHandler, Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NoInterNetIcon } from './SvgIcons'; // Assuming you have this icon component
import {  useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthProvider';

// Create Context
const BackHandlerContext = createContext();

// BackHandlerProvider to manage back button state
export const BackHandlerProvider = ({ children, currentRoute }) => {
    const navigation = useNavigation();
    const [showExitModal, setShowExitModal] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const noExitRoutes=['reports','trans','transactionreceipt','reportsTab','settlementTab','profileTab','paymentTab','payment_status']

    useEffect(() => {
        const backAction = () => {
            if(currentRoute.includes("transactionreceipt")){

                navigation.navigate('reports')
                // navigation.goBack()
            }
            if (noExitRoutes.includes(currentRoute)) {
                return false
            }
            else {
                setShowExitModal(true); // Show the exit confirmation modal
                return true; // Prevent default back button behavior

            }

        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Cleanup the listener on unmount
    }, [currentRoute]);

    const handleExitApp = () => {
        setShowExitModal(false);
        setIsAuthenticated(false)

        BackHandler.exitApp(); // Exit the app
    };

    const handleCloseModal = () => {
        setShowExitModal(false); // Close the modal
    };

    return (
        <BackHandlerContext.Provider value={{ showExitModal, setShowExitModal, handleCloseModal, handleExitApp }}>
            {children}

            {/* Exit Confirmation Modal */}
            <Modal visible={showExitModal} transparent={true} animationType="slide">
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <NoInterNetIcon />
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
        </BackHandlerContext.Provider>
    );
};

// Custom hook to use the BackHandler context
export const useBackHandler = () => {
    const context = useContext(BackHandlerContext);
    if (!context) {
        throw new Error('useBackHandler must be used within a BackHandlerProvider');
    }
    return context;
};

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
        color: '#000000',
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
