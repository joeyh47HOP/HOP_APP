

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   TouchableOpacity,
//   Linking,
// } from "react-native";
// import { XMLParser } from "fast-xml-parser";
// import he from "he";

// export default function OneMinuteMessagesScreen() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFeed = async () => {
//       try {
//         const response = await fetch(
//           "https://api.allorigins.win/raw?url=" +
//             encodeURIComponent("https://hourofpower.org/devotions/feed/")
//         );
//         const xml = await response.text();

//         const parser = new XMLParser({ cdataPropName: "cdata" });
//         const parsed = parser.parse(xml);
//         const items = parsed.rss?.channel?.item || [];

//         const formatted = items.map((item) => {
//           let rawDesc = item.description?.cdata ?? item.description ?? "";

//           let decodedDesc = he.decode(rawDesc);
//           decodedDesc = decodedDesc.replace(/<[^>]+>/g, "").trim();

//           // Regex to detect and remove bracketed ellipsis variants at the end
//           const bracketEllipsisRegex = /\[\s*(\.{3}|&hellip;|&#8230;|…)\s*\]$/;
//           const hasBracketEllipsis = bracketEllipsisRegex.test(decodedDesc);

//           // Remove bracketed ellipsis if exists
//           if (hasBracketEllipsis) {
//             decodedDesc = decodedDesc.replace(bracketEllipsisRegex, "").trim();
//           }

//           return {
//             title: he.decode(item.title),
//             description: decodedDesc,
//             time: item.pubDate,
//             link: item.link,
//             hasBracketEllipsis,
//           };
//         });

//         setPosts(formatted);
//       } catch (error) {
//         console.error("Failed to fetch or parse RSS feed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeed();
//   }, []);

//   const openLink = (url) => {
//     if (url) {
//       Linking.openURL(url);
//     }
//   };

//   const renderItem = ({ item }) => {
//   return (
//     <View style={styles.post}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Text style={styles.date}>{new Date(item.time).toLocaleDateString()}</Text>

//       {/* Description text */}
//       <Text style={styles.description}>{item.description}</Text>

//       {/* Read more below description, only if needed */}
//       {item.hasBracketEllipsis && (
//         <TouchableOpacity onPress={() => openLink(item.link)}>
//           <Text style={styles.readMore}>Read more</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };


//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#1C628F" />
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={(item, index) => index.toString()}
//       contentContainerStyle={styles.container}
//       renderItem={renderItem}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   loading: { flex: 1, justifyContent: "center", alignItems: "center" },
//   container: { padding: 15 },
//   post: {
//     backgroundColor: "#f5f5f5",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#1C628F",
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: 14,
//     color: "#333",
//   },
//   date: {
//     fontSize: 12,
//     color: "#666",
//     marginBottom: 8,
//   },
//   readMore: {
//     color: "#1C628F",
//     fontWeight: "bold",
//   },
// });
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Linking,
  RefreshControl,
  Platform,
  Pressable,
  Share,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { XMLParser } from "fast-xml-parser";
import he from "he";

const STORAGE_KEY = "OneMinuteMessagesCache";

export default function OneMinuteMessagesScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const hasFetchedOnce = useRef(false);

  const saveCache = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to save cache:", e);
    }
  };

  const loadCache = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const cachedData = JSON.parse(jsonValue);
        setPosts(cachedData);
      }
    } catch (e) {
      console.warn("Failed to load cache:", e);
    }
  };

  const fetchFeed = useCallback(async () => {
    setError(null);
    try {
      const netState = await NetInfo.fetch();
      const online = netState.isConnected;

      if (!online) {
        await loadCache();
        setError("You're offline. Showing cached messages.");
        return;
      }

      const response = await fetch(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent("https://hourofpower.org/devotions/feed/")
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const xml = await response.text();
      const parser = new XMLParser({ cdataPropName: "cdata" });
      const parsed = parser.parse(xml);
      const items = parsed.rss?.channel?.item || [];

      const formatted = items.map((item) => {
        let rawDesc = item.description?.cdata ?? item.description ?? "";
        let decodedDesc = he.decode(rawDesc).replace(/<[^>]+>/g, "").trim();
        const bracketEllipsisRegex = /\[\s*(\.{3}|&hellip;|&#8230;|…)\s*\]$/;
        const hasBracketEllipsis = bracketEllipsisRegex.test(decodedDesc);
        if (hasBracketEllipsis) {
          decodedDesc = decodedDesc.replace(bracketEllipsisRegex, "").trim();
        }
        return {
          title: he.decode(item.title),
          description: decodedDesc,
          time: item.pubDate,
          link: item.link,
          hasBracketEllipsis,
        };
      });

      setPosts(formatted);
      saveCache(formatted);
    } catch (err) {
      setError("Failed to load messages. Showing cached messages if available.");
      console.error(err);
      await loadCache();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const reconnected = !isConnected && state.isConnected;
      setIsConnected(state.isConnected);

      if (reconnected) {
        fetchFeed();
      }
    });

    if (!hasFetchedOnce.current) {
      hasFetchedOnce.current = true;
      fetchFeed(); // initial fetch
    }

    return () => unsubscribe();
  }, [fetchFeed, isConnected]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeed();
  };

  const openLink = (url) => {
    if (url) Linking.openURL(url);
  };

  const onShare = async (item) => {
    try {
      await Share.share({
        title: item.title,
        message: `${item.title}\n\n${item.description}\n\nRead more: ${item.link}`,
        url: item.link,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share message.");
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.post,
        pressed && Platform.OS === "android" ? styles.pressed : null,
      ]}
      android_ripple={{ color: "#ddd" }}
      onPress={() => openLink(item.link)}
      accessibilityRole="link"
      accessibilityLabel={`${item.title}. Tap to open full message.`}
      hitSlop={10}
    >
      <View style={styles.postContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>
            {new Date(item.time).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
          <Text
            style={styles.description}
            numberOfLines={item.hasBracketEllipsis ? 3 : undefined}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
          {item.hasBracketEllipsis && (
            <Text style={styles.readMore}>Tap to read more</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => onShare(item)}
          style={styles.shareButton}
          accessibilityRole="button"
          accessibilityLabel={`Share ${item.title}`}
          hitSlop={8}
        >
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1C628F" />
      </View>
    );
  }

  if (error && posts.length === 0) {
    return (
      <View style={styles.loading}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchFeed} style={styles.retryButton}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          enabled={isConnected} // 🔥 Pull-to-refresh only when online
          colors={["#1C628F"]}
          tintColor="#1C628F"
        />
      }
      accessibilityRole="list"
      accessibilityLabel="One Minute Messages List"
    />
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  container: { padding: 15, paddingBottom: 30 },
  post: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  pressed: {
    backgroundColor: "#eee",
  },
  postContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C628F",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  readMore: {
    marginTop: 6,
    color: "#1C628F",
    fontWeight: "600",
  },
  shareButton: {
    marginLeft: 12,
    backgroundColor: "#1C628F",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  shareText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#1C628F",
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
