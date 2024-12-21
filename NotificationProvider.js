import React, { createContext, useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [fcmToken, setFcmToken] = useState(null);
  const [hasPermission, setHasPermission] = useState(false); 

  const requestNotificationPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted');
        setHasPermission(true);

        const token = await messaging().getToken();
        setFcmToken(token);
        console.log('FCM Token:', token);
      } else {
        console.log('Notification permission denied');
        setHasPermission(false);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const handleBackgroundNotification = async (remoteMessage) => {
    console.log('Background notification handled:', remoteMessage);
    const { title, body } = remoteMessage.notification;

    Notifications.postLocalNotification({
      title: title,
      body: body, 
      priority: 'high',
      largeIcon: 'ic_launcher', 
      smallIcon: 'ic_notification', 
      ongoing: false,
    });
  };

  const handleForegroundNotification = (remoteMessage) => {
    console.log('Foreground notification received:', remoteMessage);
  };

  useEffect(() => {
    requestNotificationPermission();

    Notifications.registerRemoteNotifications();

    messaging().setBackgroundMessageHandler(handleBackgroundNotification);

    const unsubscribeOnMessage = messaging().onMessage(handleForegroundNotification);

    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ fcmToken, hasPermission }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
