// import React from 'react';
// import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

// export default function Ebooks() {

// //   const becomingUrl = 'https://mcusercontent.com/83de301bbe7ba68b7bf45a730/files/329952df-59b4-e561-63a2-ffc7ed233f36/becoming_like_jesus_ebook_compressed.pdf'; 
//   const becomingUrl = 'https://secure.hourofpower.org/resources/becoming-like-jesus-e-book/'; 
  
//   const godlyUrl = 'https://secure.hourofpower.org/resources/godly-meditations-ebook/'; 
//     //put links to funnel? 

//   const openBecoming = () => {
//     Linking.openURL(becomingUrl).catch(err => {
//       console.error("Failed to open URL:", err);
//     });
//   };
//   const openGodly = () => {
//     Linking.openURL(godlyUrl).catch(err => {
//       console.error("Failed to open URL:", err);
//     });
//   };
   

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Becoming Like Jesus</Text>
//       <Text style={styles.description}>
//         Tap below to download or view your inspirational eBook.
//       </Text>

//       <TouchableOpacity style={styles.button} onPress={openBecoming}>
//         <Text style={styles.buttonText}>Open Becoming Like Jesus</Text>
//       </TouchableOpacity>
      
   
//       <Text style={styles.title}>Godly Meditations</Text>
//       <Text style={styles.description}>
//         Tap below to download or view your inspirational eBook.
//       </Text>
//       <TouchableOpacity style={styles.button} onPress={openGodly}>
//         <Text style={styles.buttonText}>Open Godly Meditations</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'top', alignItems: 'center', padding: 20,  },
//   title: { fontSize: 24, fontWeight: 'bold', color: '#1C628F', marginBottom: 10, fontStyle:'italic' },
//   description: { fontSize: 16, textAlign: 'center', color: '#555', marginBottom: 30 },
//   button: {
//     width:'80%',
//     alignItems:'center',
//     backgroundColor: '#1C628F',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 8,
//      marginBottom: 20
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });
import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import becomingImage from  '../assets/BecomingJesus.png'; 
import godlyImage from '../assets/GodlyMeditations.png'; 

export default function Ebooks() {
  const becomingUrl = 'https://secure.hourofpower.org/resources/becoming-like-jesus-e-book/';
  const godlyUrl = 'https://secure.hourofpower.org/resources/godly-meditations-ebook/';


  const openBecoming = () => {
    Linking.openURL(becomingUrl).catch(err => {
      console.error("Failed to open URL:", err);
    });
  };
  const openGodly = () => {
    Linking.openURL(godlyUrl).catch(err => {
      console.error("Failed to open URL:", err);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Becoming Like Jesus</Text>
      <Text style={styles.description}>
        Tap the image below to download or view your inspirational eBook.
      </Text>

      <TouchableOpacity onPress={openBecoming} activeOpacity={0.8}>
        <Image source={becomingImage } style={styles.image} resizeMode="contain" />
      </TouchableOpacity>

      <Text style={styles.title}>Godly Meditations</Text>
      <Text style={styles.description}>
        Tap the image below to download or view your inspirational eBook.
      </Text>

      <TouchableOpacity onPress={openGodly} activeOpacity={0.8}>
        <Image source={godlyImage } style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1C628F', marginBottom: 10, fontStyle: 'italic' },
  description: { fontSize: 16, textAlign: 'center', color: '#555', marginBottom: 20 },
  image: {
    width: 250,
    height: 150,
    marginBottom: 30,
    borderRadius: 8,
    // optionally add shadow or border
  },
});
