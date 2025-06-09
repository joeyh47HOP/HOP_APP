import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function PrayerScreen() {
  const [message, setMessage] = useState('');

  const submitPrayer = async () => {
    if (!message.trim()) return;
    try {
      await addDoc(collection(db, 'prayer_requests'), { message, createdAt: new Date() });
      Alert.alert('Success', 'Prayer request submitted.');
      setMessage('');
    } catch (e) {
      Alert.alert('Error', 'Failed to submit request.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your prayer request:</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type here..."
        multiline
      />
      <Button title="Submit" onPress={submitPrayer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, height: 100, marginBottom: 20 }
});