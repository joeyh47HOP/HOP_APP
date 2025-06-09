import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OneMinuteMessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>One Minute Messages</Text>
      <Text>Inspirational messages will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});