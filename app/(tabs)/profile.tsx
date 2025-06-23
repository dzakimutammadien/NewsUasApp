import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: 'https://i.pravatar.cc/200' }} style={styles.avatar} />
      <Text style={styles.name}>Dzaki Muhammad Dien</Text>
      <Text style={styles.email}>dzaki@example.com</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: 'bold' },
  email: { color: '#666' },
});
