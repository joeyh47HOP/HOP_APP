// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// export default function HomeScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Hour of Power</Text>
//       <Button title="Prayer Request" onPress={() => navigation.navigate('Prayer')} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
// });

// import React from 'react';
// import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

// export default function HomeScreen({ navigation }) {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Welcome to Hour of Power</Text>

//       <Button title="Prayer Request" onPress={() => navigation.navigate('Prayer')} />
//       <Button title="About Us" onPress={() => navigation.navigate('About')} />
//       <Button title="Broadcasts" onPress={() => navigation.navigate('Broadcasts')} />
//       <Button title="Contact Us" onPress={() => navigation.navigate('Contact')} />
//       <Button title="Favorites" onPress={() => navigation.navigate('Favorites')} />
//       <Button title="One Minute Messages" onPress={() => navigation.navigate('Messages')} />
//       <Button title="Weekly Schedule" onPress={() => navigation.navigate('Schedule')} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flexGrow: 1,
//     justifyContent: 'center',
//     backgroundColor: '#fff'
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//     color: '#1C628F'
//   }
// });

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        <Image
                source={require('../assets/HOP_logo.jpg')} // Make sure this image exists
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.title}>Welcome to Hour of Power</Text>
        
        <Text style={styles.subtitle}>Select a section below</Text>
      </View>

      <View style={styles.navbar}>
        <NavButton icon="home" label="Home" onPress={() => navigation.navigate('Home')} />
          <NavButton icon="film" label="Broadcasts" onPress={() => navigation.navigate('Broadcasts')} />
        <NavButton icon="chatbubble-outline" label="Prayer" onPress={() => navigation.navigate('Prayer')} />
        <NavButton icon="play-circle-outline" label="Messages" onPress={() => navigation.navigate('Messages')} />
        <NavButton icon="heart-outline" label="Favorites" onPress={() => navigation.navigate('Favorites')} />
          {/* <NavButton icon="heart-outline" label="Prayer Feed" onPress={() => navigation.navigate('PrayerFeed')} /> */}
        <NavButton icon="call-outline" label="Contact" onPress={() => navigation.navigate('Contact')} />
          <NavButton icon="settings" label="About Us" onPress={() => navigation.navigate('About')} />
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
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1C628F', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555' },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  navButton: { alignItems: 'center' },
  navLabel: { fontSize: 12, marginTop: 4, color: '#1C628F' },
});
