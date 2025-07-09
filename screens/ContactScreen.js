// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function ContactScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Contact Us</Text>
      
//       <Text style={{ fontWeight: 'bold' }}>
//   For all correspondence or donations, please use our mailing address:
// </Text>
//       <Text>PO Box 100
// Garden Grove, CA 92842-0100</Text>
// <Text style={{ fontWeight: 'bold' }}>
//   {"\n\n"}To visit or attend a service at Shepherd’s Grove, join us at 9:00 AM or 11:00 AM at:
// </Text>
//       <Text>4445 Alton Pkwy
// Irvine, California 92604</Text>
//  <Text style={{ fontWeight: 'bold' }}>
// {"\n\n"}Ministry Phone
// </Text>
//       <Text>(714) 971-4101

// </Text>
//  <Text style={{ fontWeight: 'bold' }}>
//   {"\n\n"}
// To contact our Customer Service Department:</Text>
//       <Text>Email: customerservice@hourofpower.org
// Phone: (714) 971-4101
// {"\n\n"}
// We strive to return all phone calls, emails, and other inquiries in a timely manner. If we have not met your expectations for truly exceptional customer service, please contact Russ Jacobson, our Chief Operating Officer, for assistance and resolution. 
// {"\n\n"}
// Thank you, and God bless!

// </Text>
// <Text style={{ fontWeight: 'bold' }}>
// {"\n\n"}For Prayer Requests:
// </Text>
//       <Text>Email: prayer@hourofpower.org

// </Text>

// <Text>      {"\n\n"}Email: contact@hourofpower.org</Text>
//       <Text>Phone: +1 (123) 456-7890</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
// });
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const ContactScreen = () => {
  const openPhone = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(() => {
      Alert.alert("Error", "Unable to open phone app.");
    });
  };

  const openEmail = (email) => {
    Linking.openURL(`mailto:${email}`).catch(() => {
      Alert.alert("Error", "Unable to open mail app.");
    });
  };

  const ContactRow = ({ icon, text, onPress }) => (
    <TouchableOpacity style={styles.contactRow} onPress={onPress} activeOpacity={0.7}>
      {icon}
      <Text style={[styles.text, styles.link]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>
          For all correspondence or donations, please use our mailing address:
        </Text>
        <Text style={styles.text}>PO Box 100</Text>
        <Text style={styles.text}>Garden Grove, CA 92842-0100</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>
          To visit or attend a service at Shepherd’s Grove, join us at 9:00 AM or 11:00 AM at:
        </Text>
        <Text style={styles.text}>4445 Alton Pkwy</Text>
        <Text style={styles.text}>Irvine, California 92604</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Ministry Phone</Text>
        <ContactRow
          icon={<FontAwesome name="phone" size={20} color="#1C628F" style={styles.icon} />}
          text="(714) 971-4101"
          onPress={() => openPhone("7149714101")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Customer Service</Text>
        <ContactRow
          icon={<MaterialIcons name="email" size={20} color="#1C628F" style={styles.icon} />}
          text="customerservice@hourofpower.org"
          onPress={() => openEmail("customerservice@hourofpower.org")}
        />
        <ContactRow
          icon={<FontAwesome name="phone" size={20} color="#1C628F" style={styles.icon} />}
          text="(714) 971-4101"
          onPress={() => openPhone("7149714101")}
        />
        <Text style={styles.text}>
          We strive to return all phone calls, emails, and other inquiries in a
          timely manner. If we have not met your expectations for truly
          exceptional customer service, please contact Russ Jacobson, our Chief
          Operating Officer, for assistance and resolution.
        </Text>
        <Text style={styles.text}>Thank you, and God bless!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>For Prayer Requests</Text>
        <ContactRow
          icon={<MaterialIcons name="email" size={20} color="#1C628F" style={styles.icon} />}
          text="prayer@hourofpower.org"
          onPress={() => openEmail("prayer@hourofpower.org")}
        />
      </View>

    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1C628F",
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 15,
    color: "#333",
  },
  link: {
    color: "#1C628F",
    textDecorationLine: "underline",
  },
});

export default ContactScreen;
