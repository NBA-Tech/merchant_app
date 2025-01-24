import React, { createContext, useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { Notifications } from 'react-native-notifications';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
export const NotificationContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useRoute  } from '@react-navigation/native';
import { getMerchantSession } from './HelperFunctions';
import { BASE_URL } from './Config';
import DeviceInfo from 'react-native-device-info';
import Tts from 'react-native-tts';


const NotificationProvider = ({ children }) => {
  Tts.setDefaultPitch(1); // Default is 1.0
  Tts.setDefaultRate(0.4); // Default is 0.5

  
  const EXCLUSION_ROUTES=['splash_screen','login','mpin']
  const [fcmToken, setFcmToken] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [reqPermission, setReqPermission] = useState(false);
  const navigation = useNavigation();






  const saveFCMToken=async(token)=>{
    const merchent_session=await getMerchantSession()
    console.log(token)
    const unique_id = await  DeviceInfo.getUniqueId();
    let payload={
        id:merchent_session?.id,
        token:token,
        mac:unique_id

    }

    const clearFCM=await fetch(`${BASE_URL}/app/saveMobileNotificationToken`,{
        method:'POST',
        headers:{
            'content-type': 'application/json',
        },
        body:JSON.stringify(payload)

    })
    const res=await clearFCM.json()
    console.log(res)


  }

  const requestNotificationPermission = async () => {
    try {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (hasPermission) {
        setHasPermission(true);
        const token = await messaging().getToken();
        setFcmToken(token);
        await saveFCMToken(token)
        return;
      }

      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled && result === PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermission(true);

        const token = await messaging().getToken();
        setFcmToken(token);
        await saveFCMToken(token)
      } else {
        setHasPermission(false);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const handleBackgroundNotification = async (remoteMessage) => {
    try {
      const { title, body } = remoteMessage.notification;
  
      Notifications.postLocalNotification({
        title: title,
        body: body,
        priority: 'high',
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        ongoing: false,
      });
      Tts.speak(body);
    } catch (error) {
      console.error('Error handling background notification:', error);
    }
  };

  const handleForegroundNotification = async (remoteMessage) => {
    const { title, body } = remoteMessage.notification;
    const currentRouteName = navigation.getState().routes[navigation.getState().index].name;

    const token = await AsyncStorage.getItem('merchant_status_data');
    const user_creds = await AsyncStorage.getItem('user_creds');

    if (token == null || user_creds == null || EXCLUSION_ROUTES.includes(currentRouteName)) {
      return
    }

    Toast.show({
      type: ALERT_TYPE.INFO,
      title: title,
      textBody: body,
    });
    Tts.speak(body);

  };

  useEffect(() => {
    if (reqPermission) {
      requestNotificationPermission();
    }

    Notifications.registerRemoteNotifications();
    messaging().setBackgroundMessageHandler(handleBackgroundNotification);

    const unsubscribeOnMessage = messaging().onMessage(handleForegroundNotification);

    return () => {
      unsubscribeOnMessage();
    };
  }, [hasPermission, reqPermission]);

  return (
    <NotificationContext.Provider value={{ fcmToken, hasPermission, setReqPermission }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
