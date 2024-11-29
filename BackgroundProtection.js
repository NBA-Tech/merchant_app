import React, { useState, useEffect } from 'react';
import { AppState, View, StyleSheet, Animated } from 'react-native';
import { BlurView } from '@react-native-community/blur'; // Optional for blur effect

const withBackgroundProtection = (WrappedComponent) => {
  const ScreenProtectionHOC = (props) => {
    const [isAppInBackground, setIsAppInBackground] = useState(false);
    const opacity = new Animated.Value(0);

    useEffect(() => {
      const handleAppStateChange = (nextAppState) => {
        const isBackground = nextAppState === 'background';
        setIsAppInBackground(isBackground);

        // Animate the overlay
        Animated.timing(opacity, {
          toValue: isBackground ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange);

      return () => {
        subscription.remove();
      };
    }, []);

    return (
      <View style={{ flex: 1 }}>
        <WrappedComponent {...props} />

        {/* Overlay: Blank or Blur */}
        {isAppInBackground && (
          <Animated.View style={[styles.overlay, { opacity }]}>
            {/* Blank screen */}
            <View style={styles.blankScreen} />

            {/* Optional: Blur effect */}
            {/* <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            /> */}
          </Animated.View>
        )}
      </View>
    );
  };

  return ScreenProtectionHOC;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  blankScreen: {
    flex: 1,
    backgroundColor: 'white', // Change to black or any color for the blank screen
  },
});

export default withBackgroundProtection;
