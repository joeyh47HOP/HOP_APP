import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function DonateScreen() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://opturl.com/m4Q9vX4P' }} // Replace with your actual URL
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: {
    width: Dimensions.get('window').width,
    flex: 1,
  },
});
