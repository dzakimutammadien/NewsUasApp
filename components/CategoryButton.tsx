import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  selected: boolean;
}

export default function CategoryButton({ title, onPress, selected }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, selected && styles.selected]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#2980b9',
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#fff',
  },
});
