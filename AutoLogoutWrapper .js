import React from "react";
import { GestureHandlerRootView, GestureDetector, Gesture } from "react-native-gesture-handler";
import { useAutoLogout } from './AutoLogoutContext'; // Import the custom hook

const AutoLogoutWrapper = ({ children }) => {
  const { resetTimer } = useAutoLogout(); // Access resetTimer from context

  // Reset timer on user gestures
  const gesture = Gesture.Tap().onEnd(() => {
    resetTimer(); // Call the resetTimer function from context
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        {children}
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default AutoLogoutWrapper;
