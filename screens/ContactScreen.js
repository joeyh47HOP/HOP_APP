import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      
      <Text style={{ fontWeight: 'bold' }}>
  For all correspondence or donations, please use our mailing address:
</Text>
      <Text>PO Box 100
Garden Grove, CA 92842-0100</Text>
<Text style={{ fontWeight: 'bold' }}>
  {"\n\n"}To visit or attend a service at Shepherd’s Grove, join us at 9:00 AM or 11:00 AM at:
</Text>
      <Text>4445 Alton Pkwy
Irvine, California 92604</Text>
 <Text style={{ fontWeight: 'bold' }}>
{"\n\n"}Ministry Phone
</Text>
      <Text>(714) 971-4101

</Text>
 <Text style={{ fontWeight: 'bold' }}>
  {"\n\n"}
To contact our Customer Service Department:</Text>
      <Text>Email: customerservice@hourofpower.org
Phone: (714) 971-4101
{"\n\n"}
We strive to return all phone calls, emails, and other inquiries in a timely manner. If we have not met your expectations for truly exceptional customer service, please contact Russ Jacobson, our Chief Operating Officer, for assistance and resolution. {"\n\n"}You can reach Pastor Russ directly at: russ.jacobson@hourofpower.org or (714) 622-2952.
{"\n\n"}
Thank you, and God bless!

</Text>
<Text style={{ fontWeight: 'bold' }}>
{"\n\n"}For Prayer Requests:
</Text>
      <Text>Email: prayer@hourofpower.org

</Text>

<Text>      {"\n\n"}Email: contact@hourofpower.org</Text>
      <Text>Phone: +1 (123) 456-7890</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});