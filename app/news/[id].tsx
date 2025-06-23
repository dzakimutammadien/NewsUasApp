import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

export default function NewsDetail() {
  const route = useRoute<NewsDetailRouteProp>();
  const article = route.params.article;

  if (!article || !article.url) {
    return (
      <View style={styles.center}>
        <Text>Berita tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView source={{ uri: article.url }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
