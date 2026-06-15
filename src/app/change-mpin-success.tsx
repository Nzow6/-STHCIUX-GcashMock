import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalState } from '@/constants/state';
import { Spacing } from '@/constants/theme';

export default function ChangeMPINSuccessScreen() {
  const { pin } = useLocalSearchParams<{ pin?: string }>();

  useEffect(() => {
    if (pin && /^[0-9]{4}$/.test(pin)) {
      globalState.updatePin(pin);
    }
  }, [pin]);

  // Automatically redirect to the dashboard after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleBackToDashboard();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleBackToDashboard = () => {
    // Reset the navigation stack and go back to the main dashboard
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={64} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>MPIN Successfully Changed</Text>
        <Text style={styles.message}>
          Your new MPIN has been set. Use it the next time you log in.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleBackToDashboard}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        >
          <Text style={styles.buttonText}>Back to Dashboard</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#60646C',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: Spacing.four,
  },
  button: {
    backgroundColor: '#007CFF',
    borderRadius: 24,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
