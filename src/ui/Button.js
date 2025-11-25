import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export function Button({ title, onPress, variant = 'primary', disabled = false, loading = false }) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={isDisabled ? undefined : onPress}
      style={[
        styles.btn,
        variant === 'secondary' && styles.secondary,
        isDisabled && styles.disabled
      ]}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#1f6feb' : 'white'} />
      ) : (
        <Text style={[
          styles.text,
          variant === 'secondary' && styles.secondaryText,
          isDisabled && styles.disabledText
        ]}>
          {title}
        </Text>
      )}
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
  secondaryText: { color: '#1f6feb' },
  disabled: { backgroundColor: '#ccc', opacity: 0.6 },
  disabledText: { color: '#888' }
});