
// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Linking,
//   Share,
//   Platform,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import NetInfo from '@react-native-community/netinfo';
// import YoutubePlayer from 'react-native-youtube-iframe';

// const API_KEY = 'AIzaSyChZdM7vXA2kedNNzBCsrsHIdUV5Hls2e0';
// const CHANNEL_ID = 'UCNECApfwA4ciw3GlzRYvk5g';
// const VIDEO_COUNT = 6;

// const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${VIDEO_COUNT}`;

// const isIPad = Platform.OS === 'ios' && Platform.isPad === true;
// const screenWidth = Dimensions.get('window').width;
// const videoHeight = isIPad ? 450 : 200;
// const titleFontSize = isIPad ? 45 : 30;
// const videoTitleFontSize = isIPad ? 30 : 20;
// const videoDateFontSize = isIPad ? 18 : 14;

// const decodeHtmlEntities = (text) =>
//   text?.replace(/&amp;/g, '&')
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&quot;/g, '"')
//     .replace(/&#39;/g, "'")
//     .replace(/&apos;/g, "'")
//     .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec)) || '';

// export default function BroadcastsScreen() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isConnected, setIsConnected] = useState(true);
//   const [videoErrors, setVideoErrors] = useState({});
//   const hasFetchedOnce = useRef(false);
//   const hasShownOfflineAlert = useRef(false);
//   const retryTimeoutRef = useRef(null);
//   const retryAttempted = useRef(false);

//   const fetchVideos = useCallback(async () => {
//     setLoading(true);
//     try {
//       if (!isConnected) {
//         const cached = await AsyncStorage.getItem('@cachedVideos');
//         if (cached) {
//           setVideos(JSON.parse(cached));
//           if (!videos.length && !hasShownOfflineAlert.current) {
//             Alert.alert('Offline Mode', 'Showing cached broadcasts.');
//             hasShownOfflineAlert.current = true;
//           }
//         } else {
//           Alert.alert('Offline', 'No cached broadcasts available.');
//           setVideos([]);
//         }
//         return;
//       }

//       const response = await fetch(YOUTUBE_API_URL);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);

//       const json = await response.json();
//       if (!json.items) throw new Error('No videos found');

//       const videoItems = json.items
//         .filter(item => item.id.kind === 'youtube#video')
//         .map(item => ({
//           id: item.id.videoId,
//           title: decodeHtmlEntities(item.snippet.title),
//           date: item.snippet.publishedAt,
//           thumbnail: item.snippet.thumbnails.high.url,
//           link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
//         }));

//       setVideos(videoItems);
//       await AsyncStorage.setItem('@cachedVideos', JSON.stringify(videoItems));
//       hasShownOfflineAlert.current = false; // reset after online load
//       retryAttempted.current = false; // reset retry flag on success
//     } catch (err) {
//       console.error('Video load error:', err);

//       if (err.message === 'Network request failed') {
//         if (!retryAttempted.current) {
//           retryAttempted.current = true;
//           // Retry once after 3 seconds
//           retryTimeoutRef.current = setTimeout(() => {
//             fetchVideos();
//           }, 3000);
//           setLoading(false);
//           return;
//         }
//       }

//       const cached = await AsyncStorage.getItem('@cachedVideos');
//       if (cached) {
//         setVideos(JSON.parse(cached));
//         if (!videos.length && !hasShownOfflineAlert.current) {
//           Alert.alert('Error loading videos', 'Showing cached broadcasts instead.');
//           hasShownOfflineAlert.current = true;
//         }
//       } else {
//         Alert.alert('Error', 'Could not load videos or fallback cache.');
//         setVideos([]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [isConnected, videos.length]);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener(state => {
//       const reconnected = !isConnected && state.isConnected;
//       setIsConnected(state.isConnected);

//       if (reconnected) {
//   // Wait 2 seconds then confirm connection is still there before fetching
//   setTimeout(async () => {
//     const netState = await NetInfo.fetch();
//     if (netState.isConnected) {
//       fetchVideos();
//     }
//   }, 2000);
// }
//     });

//     if (!hasFetchedOnce.current) {
//       hasFetchedOnce.current = true;
//       fetchVideos();
//     }

//     return () => {
//       unsubscribe();
//       if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
//     };
//   }, [fetchVideos, isConnected]);

//   const openLink = (url) => {
//     Linking.openURL(url).catch(() => {
//       Alert.alert('Error', 'Failed to open the link.');
//     });
//   };

//   const shareVideo = async (video) => {
//     try {
//       await Share.share({
//         title: video.title,
//         message: `${video.title}\n\nWatch now: ${video.link}`,
//         url: video.link,
//       });
//     } catch {
//       Alert.alert('Error', 'Unable to share video.');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   if (!videos.length) {
//     return (
//       <View style={styles.centered}>
//         <Text>No broadcasts available.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={[styles.title, { fontSize: titleFontSize }]}>Recent Broadcasts</Text>

//       {videos.map((video) => (
//         <View key={video.id} style={styles.videoContainer}>
//           <TouchableOpacity onPress={() => openLink(video.link)} activeOpacity={0.7}>
//             <Text style={[styles.videoTitle, { fontSize: videoTitleFontSize }]}>
//               {video.title}
//             </Text>
//           </TouchableOpacity>

//           <Text style={[styles.videoDate, { fontSize: videoDateFontSize }]}>
//             {new Date(video.date).toLocaleDateString()}
//           </Text>

//           {isConnected && !videoErrors[video.id] ? (
//             <YoutubePlayer
//               height={videoHeight}
//               width={screenWidth - 32}
//               videoId={video.id}
//               play={false}
//               webViewProps={{
//                 allowsInlineMediaPlayback: true,
//                 startInLoadingState: true,
//               }}
//               onError={() => {
//                 setVideoErrors(prev => ({ ...prev, [video.id]: true }));
//                 Alert.alert('Video Error', 'Failed to load this video. Showing thumbnail instead.');
//               }}
//             />
//           ) : (
//             <TouchableOpacity onPress={() => openLink(video.link)} activeOpacity={0.7}>
//               <Image
//                 source={{ uri: video.thumbnail }}
//                 style={{ width: screenWidth - 32, height: videoHeight, borderRadius: 8 }}
//                 resizeMode="cover"
//               />
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             style={styles.shareButton}
//             onPress={() => shareVideo(video)}
//             accessibilityRole="button"
//             accessibilityLabel={`Share ${video.title}`}
//           >
//             <Text style={styles.shareText}>Share</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 16, backgroundColor: '#fff' },
//   centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontWeight: 'bold', marginBottom: 16, color: '#1C628F' },
//   videoContainer: { marginBottom: 24 },
//   videoTitle: {
//     fontWeight: 'bold',
//     textDecorationLine: 'underline',
//     marginBottom: 4,
//     color: '#1C628F',
//   },
//   videoDate: {
//     marginBottom: 8,
//     color: '#555',
//   },
//   shareButton: {
//     marginTop: 10,
//     alignSelf: 'flex-start',
//     backgroundColor: '#1C628F',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   shareText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 14,
//   },
// });
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  Share,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import YoutubePlayer from 'react-native-youtube-iframe';

const API_KEY = 'AIzaSyChZdM7vXA2kedNNzBCsrsHIdUV5Hls2e0';
const CHANNEL_ID = 'UCNECApfwA4ciw3GlzRYvk5g';
const VIDEO_COUNT = 6;
const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${VIDEO_COUNT}`;

const isIPad = Platform.OS === 'ios' && Platform.isPad === true;
const screenWidth = Dimensions.get('window').width;
const videoHeight = isIPad ? 450 : 200;
const titleFontSize = isIPad ? 45 : 30;
const videoTitleFontSize = isIPad ? 30 : 20;
const videoDateFontSize = isIPad ? 18 : 14;

const decodeHtmlEntities = (text) =>
  text?.replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec)) || '';

export default function BroadcastsScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [videoErrors, setVideoErrors] = useState({});
  const [videoKey, setVideoKey] = useState(0);

  const hasFetchedOnce = useRef(false);
  const hasShownOfflineAlert = useRef(false);
  const retryTimeoutRef = useRef(null);
  const retryAttempted = useRef(false);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      if (!isConnected) {
        const cached = await AsyncStorage.getItem('@cachedVideos');
        if (cached) {
          const parsed = JSON.parse(cached);
          setVideos(parsed);
          if (!parsed.length && !hasShownOfflineAlert.current) {
            Alert.alert('Offline Mode', 'Showing cached broadcasts.');
            hasShownOfflineAlert.current = true;
          }
        } else {
          Alert.alert('Offline', 'No cached broadcasts available.');
          setVideos([]);
        }
        return;
      }

      const response = await fetch(YOUTUBE_API_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const json = await response.json();
      if (!json.items) throw new Error('No videos found');

      const videoItems = json.items
        .filter(item => item.id.kind === 'youtube#video')
        .map(item => ({
          id: item.id.videoId,
          title: decodeHtmlEntities(item.snippet.title),
          date: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.high.url,
          link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));

      setVideos(videoItems);
      await AsyncStorage.setItem('@cachedVideos', JSON.stringify(videoItems));

      // ✅ Reset failed video embeds
      setVideoErrors(prev => {
        const updated = { ...prev };
        videoItems.forEach(video => {
          if (updated[video.id]) updated[video.id] = false;
        });
        return updated;
      });

      setVideoKey(prev => prev + 1); // 🔁 force re-render of YoutubePlayers
      hasShownOfflineAlert.current = false;
      retryAttempted.current = false;
    } catch (err) {
      console.error('Video load error:', err);

      if (err.message === 'Network request failed' && !retryAttempted.current) {
        retryAttempted.current = true;
        retryTimeoutRef.current = setTimeout(() => {
          fetchVideos();
        }, 3000);
        setLoading(false);
        return;
      }

      const cached = await AsyncStorage.getItem('@cachedVideos');
      if (cached) {
        const parsed = JSON.parse(cached);
        setVideos(parsed);
        if (!parsed.length && !hasShownOfflineAlert.current) {
          Alert.alert('Error loading videos', 'Showing cached broadcasts instead.');
          hasShownOfflineAlert.current = true;
        }
      } else {
        Alert.alert('Error', 'Could not load videos or fallback cache.');
        setVideos([]);
      }
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const reconnected = !isConnected && state.isConnected;
      setIsConnected(state.isConnected);

      if (reconnected) {
        setTimeout(async () => {
          const netState = await NetInfo.fetch();
          if (netState.isConnected) {
            fetchVideos();
          }
        }, 2000);
      }
    });

    if (!hasFetchedOnce.current) {
      hasFetchedOnce.current = true;
      fetchVideos();
    }

    return () => {
      unsubscribe();
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, [fetchVideos, isConnected]);

  const openLink = (url) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Failed to open the link.');
    });
  };

  const shareVideo = async (video) => {
    try {
      await Share.share({
        title: video.title,
        message: `${video.title}\n\nWatch now: ${video.link}`,
        url: video.link,
      });
    } catch {
      Alert.alert('Error', 'Unable to share video.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!videos.length) {
    return (
      <View style={styles.centered}>
        <Text>No broadcasts available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { fontSize: titleFontSize }]}>Recent Broadcasts</Text>

      {videos.map((video) => {
        const showEmbed = isConnected && !videoErrors[video.id];

        return (
          <View key={video.id} style={styles.videoContainer}>
            <TouchableOpacity onPress={() => openLink(video.link)} activeOpacity={0.7}>
              <Text style={[styles.videoTitle, { fontSize: videoTitleFontSize }]}>
                {video.title}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.videoDate, { fontSize: videoDateFontSize }]}>
              {new Date(video.date).toLocaleDateString()}
            </Text>

            {showEmbed ? (
              <YoutubePlayer
                key={`${video.id}-${videoKey}`} // 🔁 Remounts if needed
                height={videoHeight}
                width={screenWidth - 32}
                videoId={video.id}
                play={false}
                webViewProps={{
                  allowsInlineMediaPlayback: true,
                  startInLoadingState: true,
                }}
                onError={() => {
                  setVideoErrors(prev => ({ ...prev, [video.id]: true }));
                  Alert.alert('Video Error', 'Failed to load this video. Showing thumbnail instead.');
                }}
              />
            ) : (
              <TouchableOpacity onPress={() => openLink(video.link)} activeOpacity={0.7}>
                <Image
                  source={{ uri: video.thumbnail }}
                  style={{ width: screenWidth - 32, height: videoHeight, borderRadius: 8 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => shareVideo(video)}
              accessibilityRole="button"
              accessibilityLabel={`Share ${video.title}`}
            >
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontWeight: 'bold', marginBottom: 16, color: '#1C628F' },
  videoContainer: { marginBottom: 24 },
  videoTitle: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 4,
    color: '#1C628F',
  },
  videoDate: {
    marginBottom: 8,
    color: '#555',
  },
  shareButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#1C628F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  shareText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
