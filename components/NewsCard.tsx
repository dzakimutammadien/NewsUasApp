import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Toast from 'react-native-root-toast';

type Props = {
  article: any;
  onPress: () => void;
  onSaveToggle: (article: any, isSaved: boolean) => void;
  isSaved: boolean;
};

export default function NewsCard({ article, onPress, onSaveToggle, isSaved }: Props) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSavePress = () => {
    onSaveToggle(article, isSaved);
    const message = isSaved ? 'Berita dihapus dari favorit' : 'Berita disimpan';
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
        {article.urlToImage && (
          <Image source={{ uri: article.urlToImage }} style={styles.image} resizeMode="cover" />
        )}
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text numberOfLines={2} style={styles.title}>{article.title}</Text>
            <Text numberOfLines={3} style={styles.description}>{article.description}</Text>
          </View>

          <TouchableOpacity
            onPress={handleSavePress}
            style={styles.saveIconContainer}
            activeOpacity={0.6}
          >
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={26}
              color={isSaved ? '#27ae60' : '#2980b9'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Toast
        visible={toastVisible}
        position={Toast.positions.BOTTOM}
        shadow={true}
        animation={true}
        hideOnPress={true}
        backgroundColor="#333"
        textColor="#fff"
        onHide={() => setToastVisible(false)}
      >
        {toastMessage}
      </Toast>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,  // Diubah dari 8 ke 10 (sedikit lebih besar)
    backgroundColor: '#fff',
    borderRadius: 10,  // Diubah dari 8 ke 10
    overflow: 'hidden',
    elevation: 3,  // Diubah dari 2 ke 3 untuk shadow lebih jelas
  },
  image: {
    width: '100%',
    height: 120,  // Diubah ke 120px (nilai maksimum yang diminta)
  },
  contentContainer: {
    flexDirection: 'row',
    padding: 12,  // Diubah dari 8 ke 12
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingRight: 40, // space for bookmark button
  },
    title: {
    fontWeight: 'bold',
    fontSize: 16,  // Diubah dari 14 ke 16
    marginBottom: 6,  // Diubah dari 4 ke 6
  },
  description: {
    fontSize: 14,  // Diubah dari 12 ke 14
    color: '#444',
  },
  saveIconContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});