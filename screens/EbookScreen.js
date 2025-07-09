import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import becomingImage from '../assets/BecomingJesus.png';
import godlyImage from '../assets/GodlyMeditations.png';
import { Ionicons } from '@expo/vector-icons';

export default function Ebooks() {
  const [loading, setLoading] = useState(false);

  const isIPad = Platform.OS === 'ios' && Platform.isPad === true;

  // Dynamic styles for iPad
  const cardWidth = isIPad ? 650 : 280;
  const cardHeight = isIPad ? 450 : 170;
  const titleFontSize = isIPad ? 32 : 22;
  const descriptionFontSize = isIPad ? 22 : 16;
  const iconSize = isIPad ? 38 : 28;
  const loadingTextFontSize = isIPad ? 18 : 14;

  const ebooks = [
    {
      id: 'becoming',
      title: 'Becoming Like Jesus',
      description: 'Tap the image below to download or view your inspirational eBook.',
      url: 'https://mcusercontent.com/83de301bbe7ba68b7bf45a730/files/329952df-59b4-e561-63a2-ffc7ed233f36/becoming_like_jesus_ebook_compressed.pdf',
      image: becomingImage,
    },
    {
      id: 'godly',
      title: 'Godly Meditations',
      description: 'Tap the image below to download or view your inspirational eBook.',
      url: 'https://mcusercontent.com/83de301bbe7ba68b7bf45a730/files/4bae08aa-c009-6867-5256-57810d1c13f4/Godly_Meditations_eBook.pdf',
      image: godlyImage,
    },
  ];

  const openLink = async (url) => {
    try {
      setLoading(true);
      await Linking.openURL(url);
    } catch (error) {
      console.error('Failed to open URL:', error);
      alert('Failed to open the link. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {ebooks.map((ebook) => (
        <View
          key={ebook.id}
          style={[styles.card, { width: cardWidth, height: cardHeight + 100 /* extra space for text */ }]}
          accessible
          accessibilityLabel={`${ebook.title} ebook`}
        >
          <Text style={[styles.title, { fontSize: titleFontSize }]}>{ebook.title}</Text>
          <Text style={[styles.description, { fontSize: descriptionFontSize }]}>{ebook.description}</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => openLink(ebook.url)}
            style={[styles.imageButton, { width: cardWidth, height: cardHeight }]}
            accessibilityRole="button"
            accessibilityHint={`Download or view the ${ebook.title} eBook`}
          >
            <Image source={ebook.image} style={styles.image} resizeMode="contain" />
            <View style={styles.iconContainer}>
              <Ionicons name="cloud-download-outline" size={iconSize} color="#1C628F" />
            </View>
          </TouchableOpacity>
        </View>
      ))}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1C628F" />
          <Text style={[styles.loadingText, { fontSize: loadingTextFontSize }]}>Opening eBook...</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fefefe',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    // Android shadow
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    color: '#1C628F',
    marginBottom: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  description: {
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  imageButton: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    paddingBottom: '20%',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  loadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -80,
    marginTop: -40,
    width: 160,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  loadingText: {
    marginTop: 8,
    color: '#1C628F',
    fontWeight: '600',
  },
});
