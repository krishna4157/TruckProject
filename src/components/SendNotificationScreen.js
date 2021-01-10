import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';



// const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

export default async function SendNotificationScreen() {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  
  // 
  var newToken = "";

  // useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      sendPushNotification(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });

      // Notifications.removeNotificationSubscription(notificationListener);
      // Notifications.removeNotificationSubscription(responseListener);
   
  // alert('hello');
  // await sendPushNotification(expoPushToken);
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
export async function sendPushNotification(expoPushToken) {

    var happy = '😊';
    var sad = '😢';
    var worry = '🥺';
    var lovely = '😍';
    var feelingloved = '🥰';
    var crazy = '😜';
    var crying = '😭';
    var lol = '😂';
    var whathe = '😳';
    var supercrazy = '😝';
    var tensioned = '😰';
    var depressed = '😣';
    var laughing = '😁';
    var emojis = [happy,sad,worry,lovely,feelingloved,crazy,crying,lol,whathe,supercrazy,tensioned,depressed,laughing]
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'you are the best',
    body: 'And here is why '+emojis[getRandomInt(emojis.length-1)]+'the wait is over.',
    data: { data: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
