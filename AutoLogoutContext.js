import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { AppState, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthProvider';
const AutoLogoutContext = createContext();

const inactivityTime = 300000; // 5 minutes in milliseconds


export const AutoLogoutProvider = ({ children }) => {
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);
  const timerRef = useRef(null);

  // Function to reset the inactivity timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      handleAutoLogout();
    }, inactivityTime);
  };

  // Function to handle auto-logout
  const handleAutoLogout = async() => {
    const merchant_data=await AsyncStorage.getItem('merchant_status_data')
    const is_mpin_set=await AsyncStorage.getItem('is_mpin_set')
    if(merchant_data && is_mpin_set){
        Alert.alert("Session Expired", "You have been logged out due to inactivity.");
        navigation.navigate('mpin')

    }

  };

  // Listen for app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      setAppState(nextAppState);

      if (nextAppState === "active") {
        resetTimer(); // Reset timer when app comes to the foreground
      } else {
        clearTimeout(timerRef.current); // Clear timeout when app goes to the background
      }
    });

    return () => {
      subscription.remove();
      clearTimeout(timerRef.current); // Cleanup on unmount
    };
  }, []);

  // Initialize inactivity timer on component mount
  useEffect(() => {
    resetTimer();
    return () => clearTimeout(timerRef.current); // Cleanup on unmount
  }, []);

  return (
    <AutoLogoutContext.Provider value={{ resetTimer }}>
      {children}
    </AutoLogoutContext.Provider>
  );
};

export const useAutoLogout = () => {
  const context = useContext(AutoLogoutContext);
  if (!context) {
    throw new Error("useAutoLogout must be used within an AutoLogoutProvider");
  }
  return context;
};
