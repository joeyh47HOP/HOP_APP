// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import { db } from '../firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// export default function PrayerScreen() {
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const submitPrayer = async () => {
//     if (!message.trim()) {
//       Alert.alert('Error', 'Please enter your prayer request');
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       await addDoc(collection(db, 'prayer_requests'), { 
//         message: message.trim(), 
//         createdAt: serverTimestamp(),
//         status: 'pending'
//       });
//       Alert.alert('Success', 'Your prayer request has been submitted');
//       setMessage('');
//     } catch (e) {
//       console.error('Error adding document: ', e);
//       Alert.alert('Error', 'Failed to submit prayer request. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Enter your prayer request:</Text>
//       <TextInput
//         style={styles.input}
//         value={message}
//         onChangeText={setMessage}
//         placeholder="Type your prayer request here..."
//         multiline
//         numberOfLines={5}
//         textAlignVertical="top"
//       />
      
//       <TouchableOpacity
//         style={styles.submitButton}
//         onPress={submitPrayer}
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.submitButtonText}>Submit Prayer Request</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   label: { 
//     fontSize: 18, 
//     marginBottom: 10,
//     color: '#333'
//   },
//   input: { 
//     borderWidth: 1, 
//     borderColor: '#ccc', 
//     borderRadius: 5, 
//     padding: 15, 
//     height: 150, 
//     marginBottom: 20,
//     fontSize: 16,
//     textAlignVertical: 'top'
//   },
//   submitButton: {
//     backgroundColor: '#6200ee',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   }
// });

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function PrayerScreen() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submitPrayer = async () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) {
            Alert.alert('Please enter a prayer request.');
            return;
        }

        try {
            setLoading(true);
            await addDoc(collection(db, 'prayer_requests'), {
                message: trimmedMessage,
                createdAt: Timestamp.now(),
                isAnonymous: true // Optional: expand if using auth later
            });

            Alert.alert('Success', 'Your prayer request has been submitted.');
            setMessage('');
        } catch (error) {
            console.error('Error submitting prayer:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={styles.label}>Enter your prayer request:</Text>
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type here..."
                multiline
                numberOfLines={5}
                editable={!loading}
            />
            <Button
                title={loading ? 'Submitting...' : 'Submit'}
                onPress={submitPrayer}
                disabled={loading}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    label: { fontSize: 18, marginBottom: 10, fontWeight: '500' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        height: 120,
        textAlignVertical: 'top',
        marginBottom: 20,
        backgroundColor: '#fff',
    },
});