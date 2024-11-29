import React from 'react';
import { Platform, NativeModules } from 'react-native';

// For Android: Access native modules
const { ScreenshotPreventer } = NativeModules;

const withScreenshotProtection = (WrappedComponent) => {
    class ScreenProtection extends React.Component {
        componentDidMount() {
            if (Platform.OS === 'android') {
                // Block screenshots for Android
                ScreenshotPreventer.enableSecureFlag();
            } else if (Platform.OS === 'ios') {
                // Block screenshots for iOS (using blur or secure views)
                this.secureiOSScreen();
            }
        }

        componentWillUnmount() {
            if (Platform.OS === 'android') {
                // Remove the secure flag when component unmounts
                ScreenshotPreventer.disableSecureFlag();
            }
        }

        secureiOSScreen = () => {
            // Use native iOS modules to secure the screen
            // Implement secure logic here if needed
        };

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return ScreenProtection;
};

export default withScreenshotProtection;
