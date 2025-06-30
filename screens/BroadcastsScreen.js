
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
// import { WebView } from 'react-native-webview';

// const API_KEY = 'AIzaSyChZdM7vXA2kedNNzBCsrsHIdUV5Hls2e0';
// const CHANNEL_ID = 'UCNECApfwA4ciw3GlzRYvk5g';
// const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`;

// const VIDEO_COUNT = 5;

// export default function BroadcastsScreen() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const response = await fetch(YOUTUBE_API_URL);
//         const json = await response.json();

//         const videoItems = json.items.filter(item => item.id.kind === 'youtube#video');
//         setVideos(videoItems);
//       } catch (error) {
//         console.error('Failed to load videos:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const screenWidth = Dimensions.get('window').width;

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Recent Broadcasts</Text>
//       {videos.map(video => (
//         <View key={video.id.videoId} style={styles.videoContainer}>
//           <Text style={styles.videoTitle}>{video.snippet.title}</Text>
//           <Text style={styles.videoDate}>
//   {new Date(video.snippet.publishedAt).toLocaleDateString()}
// </Text>
//           <WebView
//             style={{ height: 200, width: screenWidth - 32 }}
//             javaScriptEnabled={true}
//             source={{ uri: `https://www.youtube.com/embed/${video.id.videoId}` }}
//           />
          
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 16 },
//   centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   videoContainer: {
//     marginBottom: 24,
//     alignItems: 'center',
//   },
//   videoTitle: {
//     fontSize: 16,
//     marginTop: 8,
//     textAlign: 'left',
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//   },
//   videoDate: {
//     fontSize: 16,
//     marginTop: 8,
//     marginBottom: 8,
//     textAlign: 'left',
//   },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

// Replace with your actual YouTube API key and channel
const API_KEY = 'AIzaSyChZdM7vXA2kedNNzBCsrsHIdUV5Hls2e0';
const CHANNEL_ID = 'UCNECApfwA4ciw3GlzRYvk5g';
const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`;

const decodeHtmlEntities = (text) => {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
};

export default function BroadcastsScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;

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
      {videos.map(video => {
        const cleanTitle = decodeHtmlEntities(video.snippet.title);
        const cleanDate = new Date(video.snippet.publishedAt).toLocaleDateString();

        return (
          <View key={video.id.videoId} style={styles.videoContainer}>
            <Text style={styles.videoTitle}>{cleanTitle}</Text>
            <Text style={styles.videoDate}>{cleanDate}</Text>
            <WebView
              style={{ height: 200, width: screenWidth - 32 }}
              javaScriptEnabled={true}
              source={{ uri: `https://www.youtube.com/embed/${video.id.videoId}` }}
            />
          </View>
        );
      })}
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
