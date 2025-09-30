import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';

export function Button({ title, onPress, variant='primary', disabled=false, loading=false }) {
  return (
    <Pressable
      onPress={typeof onPress === 'function' ? onPress : undefined}
      style={({ pressed }) => [
        styles.btn,
        variant === 'secondary' && styles.secondary,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && !loading && styles.pressed
      ]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled || loading}
      android_ripple={Platform.OS === 'android' ? { color: 'rgba(0,0,0,0.08)' } : undefined}
      testID={`btn-${title?.toString().toLowerCase().replace(/\s+/g, '-')}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'secondary' ? '#1f6feb' : '#ffffff'} />
      ) : (
        <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1f6feb',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: { color: 'white', fontWeight: '700' },
  secondary: { backgroundColor: '#e6eefc' },
  secondaryText: { color: '#1f6feb' },
  disabled: { opacity: 0.6 }
  ,pressed: { opacity: 0.85 }
});