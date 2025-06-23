import React, { useContext } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import { useNews } from '../../hooks/useNews';
import NewsCard from '../../components/NewsCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SavedNewsContext } from '../../context/SavedNewsContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewsDetail'>;

export default function Home() {
  const { articles, loading, refresh } = useNews();
  const navigation = useNavigation<NavigationProp>();
  const { saved, add, remove } = useContext(SavedNewsContext);

  // Cek apakah artikel sudah disimpan
  const isSaved = (article: any) => saved.some(a => a.url === article.url);

  // Toggle simpan / hapus
  const handleSaveToggle = (article: any, currentlySaved: boolean) => {
    if (currentlySaved) remove(article.url);
    else add(article);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Berita Terkini</Text>

      {loading && <ActivityIndicator size="large" color="#3498db" />}

      {!loading && articles.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada berita untuk saat ini.</Text>
        </View>
      )}

      {!loading && articles.length > 0 && (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url || Math.random().toString()}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => navigation.navigate('NewsDetail', { article: item })}
              onSaveToggle={handleSaveToggle}
              isSaved={isSaved(item)}
            />
          )}
          refreshing={loading}
          onRefresh={refresh}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#888' },
});
