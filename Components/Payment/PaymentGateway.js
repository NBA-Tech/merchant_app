import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentGateway = (props) => {
    const { url } = props?.route?.params
    const [currUrl,setCurrUrl]=useState('')


    const handleNavigation=(request)=>{
      console.log(request.url)

    }


  useEffect(()=>{
    if(url!=undefined){
      setCurrUrl(url)
    }


  },[])
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: currUrl }}
        style={styles.webview}
        onShouldStartLoadWithRequest={handleNavigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default PaymentGateway;
