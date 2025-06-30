

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
// import { XMLParser } from 'fast-xml-parser';
// import he from 'he';

// export default function OneMinuteMessagesScreen() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFeed = async () => {
//       try {
//         const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://hourofpower.org/devotions/feed/'));
//         const xml = await response.text();

//         const parser = new XMLParser();
//         const parsed = parser.parse(xml);
//         const items = parsed.rss?.channel?.item || [];

//         const formatted = items.map((item) => ({
//           title: item.title,
//           description: he.decode(item.description
//             ?.replace(/<[^>]+>/g, '').trim())
//           ,
//           time: item.pubDate,
//         }));
        
//         console.log(formatted)
//         setPosts(formatted);
//       } catch (error) {
//         console.error('Failed to fetch or parse RSS feed:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchFeed();
//   }, []);

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
//       renderItem={({ item }) => (
//         <View style={styles.post}>
//           <Text style={styles.title}>{item.title}</Text>
//           <Text style={styles.date}>
//   {new Date(item.time).toLocaleDateString()}
// </Text>

//           <Text style={styles.description}>{item.description?.replace(/<[^>]+>/g, '')}</Text>
//         </View>
//       )}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   container: { padding: 15 },
//   post: {
//     backgroundColor: '#f5f5f5',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1C628F',
//     marginBottom: 5,
//   },
//   description: {
//     fontSize: 14,
//     color: '#333',
//   },
//   date: {
//   fontSize: 12,
//   color: '#666',
//   marginBottom: 8,
// },
// });

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { XMLParser } from "fast-xml-parser";
import he from "he";

export default function OneMinuteMessagesScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(
          "https://api.allorigins.win/raw?url=" +
            encodeURIComponent("https://hourofpower.org/devotions/feed/")
        );
        const xml = await response.text();

        const parser = new XMLParser({ cdataPropName: "cdata" });
        const parsed = parser.parse(xml);
        const items = parsed.rss?.channel?.item || [];

        const formatted = items.map((item) => {
          let rawDesc = item.description?.cdata ?? item.description ?? "";

          let decodedDesc = he.decode(rawDesc);
          decodedDesc = decodedDesc.replace(/<[^>]+>/g, "").trim();

          // Regex to detect and remove bracketed ellipsis variants at the end
          const bracketEllipsisRegex = /\[\s*(\.{3}|&hellip;|&#8230;|…)\s*\]$/;
          const hasBracketEllipsis = bracketEllipsisRegex.test(decodedDesc);

          // Remove bracketed ellipsis if exists
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
      } catch (error) {
        console.error("Failed to fetch or parse RSS feed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const openLink = (url) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const renderItem = ({ item }) => {
  return (
    <View style={styles.post}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{new Date(item.time).toLocaleDateString()}</Text>

      {/* Description text */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Read more below description, only if needed */}
      {item.hasBracketEllipsis && (
        <TouchableOpacity onPress={() => openLink(item.link)}>
          <Text style={styles.readMore}>Read more</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};


  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1C628F" />
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 15 },
  post: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C628F",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  readMore: {
    color: "#1C628F",
    fontWeight: "bold",
  },
});
