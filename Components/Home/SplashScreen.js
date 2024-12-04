import React, {  useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {

  const scaleValue = useRef(new Animated.Value(2)).current; // Initial scale for the image
  const text1X = useRef(new Animated.Value(Dimensions.get('window').width)).current; // Start outside the screen (right)
  const text2X = useRef(new Animated.Value(Dimensions.get('window').width)).current; // Start outside the screen (right)

  useFocusEffect(
    React.useCallback(() => {
      // Create a function to handle the animation sequence
      const runAnimations = async () => {
        // Animate image scaling
        await new Promise((resolve) => {
          Animated.timing(scaleValue, {
            toValue: 1, // Final scale
            duration: 500, // Duration of scaling animation
            useNativeDriver: true,
          }).start(resolve);
        });

        // Animate text 1 moving near the image
        await new Promise((resolve) => {
          Animated.timing(text1X, {
            toValue: 0, // Move to the starting of the row
            duration: 500,
            delay: 100, // Delay to start after the image scaling
            useNativeDriver: true,
          }).start(resolve);
        });

        // Animate text 2 moving to the center
        await new Promise((resolve) => {
          Animated.timing(text2X, {
            toValue: 0, // Center position relative to row
            duration: 500,
            delay: 100, // Delay after the first text animation
            useNativeDriver: true,
          }).start(resolve);
        });
        setTimeout(async () => {
          const token = await AsyncStorage.getItem('merchant_status_data');
          if (token != null) {
            navigation.navigate('mpin');
          } else {
            navigation.navigate('login');
          }
          
        }, 2000);

        // After all animations are completed, check token and navigate
       
      };

      runAnimations();

      // Cleanup (if needed)
      return () => {
        // Optional: Reset animated values if you want to restart the animation each time the screen is focused
        scaleValue.setValue(2);
        text1X.setValue(Dimensions.get('window').width);
        text2X.setValue(Dimensions.get('window').width);
      };
    }, [navigation]) // Dependency array to ensure the effect runs only when necessary
  );

  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      {/* First row: Image and Text */}
      <View style={styles.row}>
        <Animated.Image
          source={require('../../assets/images/A_logo.png')} // Replace with your image path
          style={[
            styles.image,
            { transform: [{ scale: scaleValue }] }, // Apply scaling transformation
          ]}
        />
        <Animated.Text
          style={[
            styles.logoText,
            { transform: [{ translateX: text1X }] }, // Move from right to near the image
          ]}
        >
          rthpay
        </Animated.Text>
      </View>

      {/* Second row: Tagline */}
      <Animated.Text
        style={[
          styles.taglineText,
          { transform: [{ translateX: text2X }] }, // Move from right to center
        ]}
      >
        Simplified Digital Payments
      </Animated.Text>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Set background color for the splash screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically align image and text in the row
  },
  image: {
    width: width * 0.2, // Adjust image size relative to screen width
    height: height * 0.1, // Adjust image height relative to screen height
    resizeMode: 'contain', // Keep aspect ratio
  },
  logoText: {
    color: '#000',
    fontSize: 50,
    fontFamily: 'IBMPlexSans-Bold',
    marginLeft: 10, // Space between image and text
  },
  taglineText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'IBMPlexSans-Regular',
    marginTop: 20, // Add some space between rows
  },
});

export default SplashScreen;
