import React, { useContext } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { SavedNewsContext } from '../../context/SavedNewsContext';
import NewsCard from '../../components/NewsCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewsDetail'>;

export default function Saved() {
  const { saved, remove } = useContext(SavedNewsContext);
  const navigation = useNavigation<NavigationProp>();

  // Confirm before removing saved news
  const handleRemove = (url: string) => {
    Alert.alert(
      'Hapus Berita',
      'Apakah kamu yakin ingin menghapus berita ini dari daftar simpanan?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => remove(url) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Berita Disimpan</Text>

      {saved.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.empty}>Belum ada berita disimpan</Text>
        </View>
      ) : (
        <FlatList
          data={saved}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => navigation.navigate('NewsDetail', { article: item })}
              onSaveToggle={() => handleRemove(item.url)}
              isSaved={true}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { fontSize: 16, color: '#999' },
});
