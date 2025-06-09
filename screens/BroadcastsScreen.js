import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BroadcastsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Broadcasts</Text>
      <Text>Watch recent and past episodes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});