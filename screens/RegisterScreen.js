import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  // import the shared auth instance

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful! You can now log in.');
      navigation.navigate('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Register" onPress={register} />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
});
