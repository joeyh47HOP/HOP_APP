// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function OneMinuteMessagesScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>One Minute Messages</Text>
//       <Text>Inspirational messages will appear here.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
// });

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { XMLParser } from 'fast-xml-parser';

export default function OneMinuteMessagesScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://hourofpower.org/devotions/feed/'));
        const xml = await response.text();

        const parser = new XMLParser();
        const parsed = parser.parse(xml);
        const items = parsed.rss?.channel?.item || [];

        const formatted = items.map((item) => ({
          title: item.title,
          description: item.description,
          time: item.pubDate,
        }));
        
        
        setPosts(formatted);
      } catch (error) {
        console.error('Failed to fetch or parse RSS feed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeed();
  }, []);

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
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>
  {new Date(item.time).toLocaleDateString()}
</Text>

          <Text style={styles.description}>{item.description?.replace(/<[^>]+>/g, '')}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { padding: 15 },
  post: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C628F',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
  },
  date: {
  fontSize: 12,
  color: '#666',
  marginBottom: 8,
},
});
