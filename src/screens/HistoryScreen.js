import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import useHistoryStore from '../store/historyStore';

export default function HistoryScreen({ navigation }) {
  const records = useHistoryStore(s => s.records);
  const clear = useHistoryStore(s => s.clear);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
      <View style={styles.item}>
        {item.imageUri ? <Image source={{ uri: item.imageUri }} style={styles.thumb} /> : <View style={[styles.thumb, styles.placeholder]} />}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.plantName}</Text>
          <Text style={styles.subtitle}>{item.diseaseName} • {Math.round(item.confidence*100)}% • {dayjs(item.createdAt).format('D MMM, HH:mm')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {records.length === 0 ? (
        <View style={styles.empty}><Text>No scans yet.</Text></View>
      ) : (
        <FlatList
          data={records.slice().reverse()}
          keyExtractor={i => i.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} />}
          contentContainerStyle={{ padding: 12 }}
        />
      )}
      <TouchableOpacity style={styles.clearBtn} onPress={clear}>
        <Text style={{ color: 'white', fontWeight: '700' }}>Clear history</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', gap: 12, paddingVertical: 10, alignItems: 'center' },
  thumb: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#f0f0f0' },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  title: { fontWeight: '700' },
  subtitle: { color: '#666', marginTop: 2 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  clearBtn: {
    position: 'absolute', bottom: 24, right: 24, backgroundColor: '#1f6feb', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 999
  }
});