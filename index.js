/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { firebase } from '@react-native-firebase/app';
import Tts from 'react-native-tts';


if (!firebase.apps.length) {
    firebase.initializeApp();
  }


AppRegistry.registerHeadlessTask(
  'ReactNativeFirebaseMessagingHeadlessTask',
  () => async (remoteMessage) => {
    Tts.setDefaultPitch(1); // Default is 1.0
    Tts.setDefaultRate(0.4); // Default is 0.5
    const { title, body } = remoteMessage.notification;
    Tts.speak(body)
  }
);


AppRegistry.registerComponent(appName, () => App);
