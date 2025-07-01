

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Linking } from 'react-native';

// export default function HomeScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
        
//         <Image
//                 source={require('../assets/HOP_logo.jpg')} // Make sure this image exists
//                 style={styles.image}
//                 resizeMode="contain"
//               />
//               <Text style={styles.title}>Welcome to Hour of Power</Text>
        
//         <Text style={styles.subtitle}>Select a section below</Text>
//       </View>

//       <View style={styles.navbar}>
//         <NavButton icon="home" label="Home" onPress={() => navigation.navigate('Home')} />
//           <NavButton icon="film" label="Broadcasts" onPress={() => navigation.navigate('Broadcasts')} />
//         <NavButton icon="chatbubble-outline" label="Prayer" onPress={() => navigation.navigate('Prayer')} />
//         <NavButton icon="book" label="Messages" onPress={() => navigation.navigate('Messages')} />
//           <NavButton icon="book" label="eBooks" onPress={() => navigation.navigate('Ebook')} />
//         <NavButton icon="heart-outline" label="Favorites" onPress={() => navigation.navigate('Favorites')} />
//           {/* <NavButton icon="heart-outline" label="Prayer Feed" onPress={() => navigation.navigate('PrayerFeed')} /> */}
//           <NavButton
//   icon="leaf"
//   label="Donate"
//   onPress={() => Linking.openURL('https://hourofpower.org/yt_donate/')}
// />
//         <NavButton icon="call-outline" label="Contact" onPress={() => navigation.navigate('Contact')} />
//           <NavButton icon="settings" label="About Us" onPress={() => navigation.navigate('About')} />
//       </View>
//     </View>
//   );
// }

// function NavButton({ icon, label, onPress }) {
//   return (
//     <TouchableOpacity style={styles.navButton} onPress={onPress}>
//       <Icon name={icon} size={24} color="#1C628F" />
//       <Text style={styles.navLabel}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'space-between', backgroundColor: '#fff' },
//   image: {
//     width: '100%',
//     height: 200,
//     marginBottom: 20,
//     borderRadius: 10,
//   },
//   content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 26, fontWeight: 'bold', color: '#1C628F', marginBottom: 10 },
//   subtitle: { fontSize: 16, color: '#555' },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#f9f9f9',
//   },
//   navButton: { alignItems: 'center' },
//   navLabel: { fontSize: 12, marginTop: 4, color: '#1C628F' },
// });

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/HOP_logo.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to Hour of Power</Text>
        
      </View>

      {/* Modal menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>More Options</Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Contact'); setModalVisible(false); }}>
              <Text style={styles.modalItem}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('About'); setModalVisible(false); }}>
              <Text style={styles.modalItem}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Prayer'); setModalVisible(false); }}>
              <Text style={styles.modalItem}>Prayer Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Favorites'); setModalVisible(false); }}>
              <Text style={styles.modalItem}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.navbar}>
        <NavButton icon="home" label="Home" onPress={() => navigation.navigate('Home')} />
        <NavButton icon="film" label="Broadcasts" onPress={() => navigation.navigate('Broadcasts')} />
          <NavButton icon="book" label="Messages" onPress={() => navigation.navigate('Messages')} />
        
           {/* <NavButton icon="leaf" label="Donate" onPress={() => Linking.openURL('https://hourofpower.org/yt_donate/')} /> */}
        <NavButton icon="leaf" label="Donate" onPress={() => navigation.navigate('Donate')} />
        <NavButton icon="book" label="eBooks" onPress={() => navigation.navigate('Ebook')} />
          <NavButton icon="chatbubble-outline" label="Prayer" onPress={() => navigation.navigate('Prayer')} />
        {/* <NavButton icon="heart-outline" label="Favorites" onPress={() => navigation.navigate('Favorites')} /> */}
       
        <NavButton icon="menu" label="More" onPress={() => setModalVisible(true)} />
      </View>
    </View>
  );
}

function NavButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.navButton} onPress={onPress}>
      <Icon name={icon} size={24} color="#1C628F" />
      <Text style={styles.navLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', backgroundColor: '#fff' },
  image: { width: '100%', height: 200, marginBottom: 20, borderRadius: 10 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1C628F', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555' },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  navButton: { alignItems: 'center', marginHorizontal: 4 },
  navLabel: { fontSize: 12, marginTop: 4, color: '#1C628F' },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#1C628F' },
  modalItem: { fontSize: 16, paddingVertical: 10, color: '#333' },
  modalClose: { fontSize: 16, color: '#1C628F', marginTop: 20, textAlign: 'right' },
});
