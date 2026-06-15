import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DEFAULT_USER } from '@/constants/default-user';
import { useGlobalState } from '@/constants/state';
import { Spacing } from '@/constants/theme';

export default function ChangeMPINCurrentScreen() {
  const { activeUser } = useGlobalState();
  const user = activeUser || DEFAULT_USER;

  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<TextInput>(null);

  const handlePinChange = (value: string) => {
    // Only allow numeric input
    const sanitized = value.replace(/[^0-9]/g, '').slice(0, 4);
    setError(null);
    setPin(sanitized);

    if (sanitized.length === 4) {
      if (sanitized === user.pin) {
        setTimeout(() => {
          router.push('/change-mpin-new');
        }, 200);
      } else {
        setTimeout(() => {
          setError('Incorrect MPIN. Please try again.');
          setPin('');
        }, 200);
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  const renderSlots = () => {
    const slots = [];
    for (let i = 0; i < 4; i++) {
      const isFilled = i < pin.length;
      slots.push(
        <View key={i} style={styles.slot}>
          {isFilled ? (
            <Text style={styles.filledDigit}>•</Text>
          ) : (
            <Text style={styles.dash}>—</Text>
          )}
        </View>
      );
    }
    return slots;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Blue Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Change GCash MPIN</Text>
        <View style={styles.headerSpacer} />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 24 })}
        >
          <View style={styles.content}>
            <Text style={styles.prompt}>Enter your current MPIN</Text>

            <Pressable
              onPress={() => inputRef.current?.focus()}
              style={styles.pinContainer}
            >
              {renderSlots()}
            </Pressable>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TextInput
              ref={inputRef}
              value={pin}
              onChangeText={handlePinChange}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              autoFocus
              style={styles.hiddenInput}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  header: {
    height: 56,
    backgroundColor: '#007CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
  },
  backButton: {
    padding: Spacing.two,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: '20%',
  },
  prompt: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: Spacing.four,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.four,
    paddingVertical: Spacing.two,
  },
  slot: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dash: {
    fontSize: 32,
    color: '#C7C7CC',
    fontWeight: '300',
    lineHeight: 40,
  },
  filledDigit: {
    fontSize: 32,
    color: '#0A2E5C',
    fontWeight: 'bold',
    lineHeight: 40,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: Spacing.three,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
