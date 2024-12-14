import React, { useState, useEffect } from 'react';
import { AppState, View, StyleSheet, Platform,Animated } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const withBackgroundProtection = (WrappedComponent) => {
  const ScreenProtectionHOC = (props) => {
    const [isAppInBackground, setIsAppInBackground] = useState(false);
    const opacity = new Animated.Value(0);

    useEffect(() => {
      const handleAppStateChange = (nextAppState) => {
        const isBackground = nextAppState === 'background' || nextAppState === 'inactive';
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

        {/* Overlay: BlurView */}
        {isAppInBackground && Platform.OS == 'ios' && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light" // Options: 'light', 'dark', 'extraLight'
            blurAmount={10} // Adjust the blur intensity
            reducedTransparencyFallbackColor="white" // Fallback color for older devices
          />
        )}

        {isAppInBackground && Platform.OS == "android" && (
          <Animated.View style={[styles.overlay, { opacity }]}>
            <View style={styles.blankScreen} />
          </Animated.View>
        )

        }


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
