// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function BroadcastsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Broadcasts</Text>
//       <Text>Watch recent and past episodes</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
// });


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
//   Image,
//   Linking,
//   Alert,
// } from 'react-native';



// export default function BroadcastsScreen() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const res = await fetch(YOUTUBE_API_URL);
//         const data = await res.json();

//         if (!data.items) {
//           throw new Error('No videos found');
//         }

//         const parsedVideos = data.items
//           .filter(item => item.id.kind === 'youtube#video')
//           .map(item => ({
//             id: item.id.videoId,
//             title: item.snippet.title,
//             thumbnail: item.snippet.thumbnails.high.url,
//             link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
//           }));

//         setVideos(parsedVideos);
//       } catch (err) {
//         console.error('YouTube API error:', err);
//         Alert.alert('Error', 'Failed to load videos. Check your API key and channel ID.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Broadcasts</Text>
//       {videos.length === 0 ? (
//         <Text>No videos available.</Text>
//       ) : (
//         videos.map(video => (
//           <TouchableOpacity
//             key={video.id}
//             style={styles.card}
//             onPress={() => Linking.openURL(video.link)}
//           >
//             <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
//             <Text style={styles.videoTitle}>{video.title}</Text>
//           </TouchableOpacity>
//         ))
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 16, backgroundColor: '#fff' },
//   centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   card: { marginBottom: 20 },
//   thumbnail: { width: '100%', height: 200, borderRadius: 10 },
//   videoTitle: { fontSize: 16, marginTop: 8 },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const API_KEY = 'AIzaSyChZdM7vXA2kedNNzBCsrsHIdUV5Hls2e0';
const CHANNEL_ID = 'UCNECApfwA4ciw3GlzRYvk5g';
const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`;

const VIDEO_COUNT = 5;

export default function BroadcastsScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(YOUTUBE_API_URL);
        const json = await response.json();

        const videoItems = json.items.filter(item => item.id.kind === 'youtube#video');
        setVideos(videoItems);
      } catch (error) {
        console.error('Failed to load videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const screenWidth = Dimensions.get('window').width;

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recent Broadcasts</Text>
      {videos.map(video => (
        <View key={video.id.videoId} style={styles.videoContainer}>
          <Text style={styles.videoTitle}>{video.snippet.title}</Text>
          <Text style={styles.videoDate}>
  {new Date(video.snippet.publishedAt).toLocaleDateString()}
</Text>
          <WebView
            style={{ height: 200, width: screenWidth - 32 }}
            javaScriptEnabled={true}
            source={{ uri: `https://www.youtube.com/embed/${video.id.videoId}` }}
          />
          
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  videoContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'left',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  videoDate: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
  },
});
