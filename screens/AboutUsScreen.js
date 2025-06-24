// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function AboutUsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>About Us</Text>
//       <Text>Many people who tune into the Hour of Power each week aren’t familiar with the over 50 years of history standing behind Pastor Bobby Schuller. From the very beginning, our ministry has been on the cutting edge of bringing the Good News of The Gospel to those outside the church walls, and Pastor Bobby Schuller continues this legacy by staying true to our mission:
// {"\n"}
// {"\n"}

// To impart the dignity of all people through the teachings of Jesus and to offer them a place of hope, healing, and belonging.
// {"\n"}
// {"\n"}

// The first Hour of Power program, featuring Dr. Robert Schuller, was televised in 1970 on KTLA Channel 5 in Los Angeles. Within a year, the broadcast, which was the first televised church service in history, had expanded to many other states across the nation and eventually to five continents.
// {"\n"}
// {"\n"}
// Today, millions of viewers tune in to watch Pastor Bobby Schuller and the Hour of Power broadcast for uplifting music, encouraging interviews, and inspiring messages designed to help people live a life of meaning as they become happy and whole students of Jesus.
// {"\n"}
// {"\n"}
// We at Hour of Power are excited about this new season, which finds us passionately ministering the message of God’s love and dignity to millions, as we look forward to further growth and expanded influence in the coming years. Building upon our rich past, we are walking boldly into the future with full assurance of faith, believing that what is to come will be greater than what is behind. As possibility thinkers with hearts full of hope, we are confident that our best days are ahead of us, and we invite you to come join us. </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 20, paddingRight: 20, paddingBottom: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
// });
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function AboutUsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Image
        source={require('../assets/AboutUsImage.jpg')} // Make sure this image exists
        style={styles.image}
        resizeMode="contain"
      />
      
      <Text style={styles.text}>
        Many people who tune into the Hour of Power each week aren’t familiar with the over 50 years of history standing behind Pastor Bobby Schuller. From the very beginning, our ministry has been on the cutting edge of bringing the Good News of The Gospel to those outside the church walls, and Pastor Bobby Schuller continues this legacy by staying true to our mission:
        {"\n\n"}
        To impart the dignity of all people through the teachings of Jesus and to offer them a place of hope, healing, and belonging.
        {"\n\n"}
        The first Hour of Power program, featuring Dr. Robert Schuller, was televised in 1970 on KTLA Channel 5 in Los Angeles. Within a year, the broadcast, which was the first televised church service in history, had expanded to many other states across the nation and eventually to five continents.
        {"\n\n"}
        Today, millions of viewers tune in to watch Pastor Bobby Schuller and the Hour of Power broadcast for uplifting music, encouraging interviews, and inspiring messages designed to help people live a life of meaning as they become happy and whole students of Jesus.
        {"\n\n"}
        We at Hour of Power are excited about this new season, which finds us passionately ministering the message of God’s love and dignity to millions, as we look forward to further growth and expanded influence in the coming years. Building upon our rich past, we are walking boldly into the future with full assurance of faith, believing that what is to come will be greater than what is behind. As possibility thinkers with hearts full of hope, we are confident that our best days are ahead of us, and we invite you to come join us.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1C628F',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
