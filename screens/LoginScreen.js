import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} autoCapitalize="none" keyboardType="email-address" />
      <Text>Password</Text>
      <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Login" onPress={login} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
});
