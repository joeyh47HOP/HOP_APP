// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   StyleSheet,
//   RefreshControl,
// } from 'react-native';
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// import { db } from '../firebase';
// import { format } from 'date-fns';

// export default function PrayerFeedScreen() {
//   const [prayers, setPrayers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchPrayers = async () => {
//     try {
//       const q = query(collection(db, 'prayer_requests'), orderBy('createdAt', 'desc'));
//       const querySnapshot = await getDocs(q);
//       const items = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setPrayers(items);
//     } catch (error) {
//       console.error('Error fetching prayers:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchPrayers();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchPrayers();
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.date}>
//         {item.createdAt?.toDate
//           ? format(item.createdAt.toDate(), 'PPPp')
//           : 'Unknown date'}
//       </Text>
//       <Text style={styles.message}>{item.message}</Text>
//     </View>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
//   }

//   return (
//     <FlatList
//       data={prayers}
//       keyExtractor={item => item.id}
//       renderItem={renderItem}
//       contentContainerStyle={styles.list}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//     />
//   );
// }

// const styles = StyleSheet.create({
//   list: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   date: {
//     fontSize: 12,
//     color: '#888',
//     marginBottom: 8,
//   },
//   message: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';

export default function PrayerFeedScreen() {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPrayers = async () => {
    try {
      const q = query(collection(db, 'prayer_requests'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPrayers(items);
    } catch (error) {
      console.error('Error fetching prayers:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPrayers();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPrayers();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>
        {item.createdAt?.toDate
          ? format(item.createdAt.toDate(), 'PPPp')
          : 'Date unknown'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prayer Feed</Text>
      {prayers.length === 0 ? (
        <Text style={styles.noPrayers}>No prayer requests yet.</Text>
      ) : (
        <FlatList
          data={prayers}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f7',
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f7',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  message: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  noPrayers: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#999',
    marginTop: 20,
  },
});
