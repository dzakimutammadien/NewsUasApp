import React, { useState, useContext } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNews } from '../../hooks/useNews';
import CategoryButton from '../../components/CategoryButton';
import NewsCard from '../../components/NewsCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { SavedNewsContext } from '../../context/SavedNewsContext';

const categories = [
  'business', 'entertainment', 'general',
  'health', 'science', 'sports', 'technology',
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NewsDetail'>;

export default function Categories() {
  const [selected, setSelected] = useState('general');
  const { articles, loading, refresh } = useNews(selected);
  const navigation = useNavigation<NavigationProp>();
  const { saved, add, remove } = useContext(SavedNewsContext);

  // Cek artikel sudah disimpan
  const isSaved = (article: any) => saved.some(a => a.url === article.url);

  // Toggle simpan / hapus
  const handleSaveToggle = (article: any, currentlySaved: boolean) => {
    if (currentlySaved) remove(article.url);
    else add(article);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kategori</Text>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            selected={item === selected}
            onPress={() => setSelected(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10 }}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      {loading && <ActivityIndicator size="large" color="#3498db" />}

      {!loading && articles.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada berita untuk kategori ini.</Text>
        </View>
      )}

      {!loading && articles.length > 0 && (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
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
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#888' },
});
