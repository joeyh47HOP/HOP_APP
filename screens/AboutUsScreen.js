
// import React from 'react';
// import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// export default function AboutUsScreen() {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>About Us</Text>
//       <Image
//         source={require('../assets/AboutUsImage.jpg')} // Make sure this image exists
//         style={styles.image}
//         resizeMode="contain"
//       />
      
//       <Text style={styles.text}>
//         Many people who tune into the Hour of Power each week aren’t familiar with the over 50 years of history standing behind Pastor Bobby Schuller. From the very beginning, our ministry has been on the cutting edge of bringing the Good News of The Gospel to those outside the church walls, and Pastor Bobby Schuller continues this legacy by staying true to our mission:
//         {"\n\n"}
//         To impart the dignity of all people through the teachings of Jesus and to offer them a place of hope, healing, and belonging.
//         {"\n\n"}
//         The first Hour of Power program, featuring Dr. Robert Schuller, was televised in 1970 on KTLA Channel 5 in Los Angeles. Within a year, the broadcast, which was the first televised church service in history, had expanded to many other states across the nation and eventually to five continents.
//         {"\n\n"}
//         Today, millions of viewers tune in to watch Pastor Bobby Schuller and the Hour of Power broadcast for uplifting music, encouraging interviews, and inspiring messages designed to help people live a life of meaning as they become happy and whole students of Jesus.
//         {"\n\n"}
//         We at Hour of Power are excited about this new season, which finds us passionately ministering the message of God’s love and dignity to millions, as we look forward to further growth and expanded influence in the coming years. Building upon our rich past, we are walking boldly into the future with full assurance of faith, believing that what is to come will be greater than what is behind. As possibility thinkers with hearts full of hope, we are confident that our best days are ahead of us, and we invite you to come join us.
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     marginBottom: 20,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     textAlign: 'center',
//     color: '#1C628F',
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//     lineHeight: 24,
//   },
// });
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Platform } from "react-native";

export default function AboutUsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Us</Text>

      <Image
        source={require("../assets/AboutUsImage.jpg")} // confirm this path exists
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.paragraph}>
        Many people who tune into the Hour of Power each week aren’t familiar with the over 50 years of history standing behind Pastor Bobby Schuller. From the very beginning, our ministry has been on the cutting edge of bringing the Good News of The Gospel to those outside the church walls, and Pastor Bobby Schuller continues this legacy by staying true to our mission:
      </Text>

      <View style={styles.missionContainer}>
        <Text style={styles.missionText}>
          To impart the dignity of all people through the teachings of Jesus and to offer them a place of hope, healing, and belonging.
        </Text>
      </View>

      <Text style={styles.paragraph}>
        The first Hour of Power program, featuring Dr. Robert Schuller, was televised in 1970 on KTLA Channel 5 in Los Angeles. Within a year, the broadcast, which was the first televised church service in history, had expanded to many other states across the nation and eventually to five continents.
      </Text>

      <Text style={styles.paragraph}>
        Today, millions of viewers tune in to watch Pastor Bobby Schuller and the Hour of Power broadcast for uplifting music, encouraging interviews, and inspiring messages designed to help people live a life of meaning as they become happy and whole students of Jesus.
      </Text>

      <Text style={styles.paragraph}>
        We at Hour of Power are excited about this new season, which finds us passionately ministering the message of God’s love and dignity to millions, as we look forward to further growth and expanded influence in the coming years. Building upon our rich past, we are walking boldly into the future with full assurance of faith, believing that what is to come will be greater than what is behind. As possibility thinkers with hearts full of hope, we are confident that our best days are ahead of us, and we invite you to come join us.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FAFAFA",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: Platform.OS === "ios" ? "600" : "700",
    marginBottom: 20,
    color: "#1C628F",
    textAlign: "center",
    letterSpacing: 1,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 12,
    marginBottom: 25,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  paragraph: {
    fontSize: 16,
    color: "#444",
    lineHeight: 26,
    marginBottom: 18,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  missionContainer: {
    backgroundColor: "#E7F0F8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#1C628F",
  },
  missionText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1C628F",
    lineHeight: 26,
    fontStyle: "italic",
  },
});
