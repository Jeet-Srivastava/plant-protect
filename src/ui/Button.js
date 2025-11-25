import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export function Button({ title, onPress, variant='primary' }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, variant === 'secondary' && styles.secondary]}>
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1f6feb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: { color: 'white', fontWeight: '700' },
  secondary: { backgroundColor: '#e6eefc' },
  secondaryText: { color: '#1f6feb' }
});