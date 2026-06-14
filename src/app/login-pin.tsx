import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { NumericKeypad } from '@/components/numeric-keypad';
import { Spacing } from '@/constants/theme';
import { globalState } from '@/constants/state';

export default function LoginPINScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Retrieve user details from global state (registered or default user)
  const user = phone ? globalState.getUser(phone) : null;

  const handleKeyPress = (digit: string) => {
    if (code.length < 4) {
      setError(null);
      const nextCode = code + digit;
      setCode(nextCode);

      // Auto-validate once 4 digits are completed
      if (nextCode.length === 4) {
        if (user && nextCode === user.pin) {
          // Set active logged-in user session
          globalState.setActiveUser(user);
          globalState.setLoggedIn(true);

          // Route to dashboard and replace screen to prevent going back to login
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 300);
        } else {
          // Error feedback
          setTimeout(() => {
            setError('Incorrect PIN. Please try again.');
            setCode('');
          }, 300);
        }
      }
    }
  };

  const handleDelete = () => {
    setError(null);
    setCode((prev) => prev.slice(0, -1));
  };

  const handleBack = () => {
    router.back();
  };

  // Render the 4 dots indicating input slots
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      const isFilled = i < code.length;
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            isFilled && styles.dotFilled,
            error && styles.dotError,
          ]}
        />
      );
    }
    return dots;
  };

  // Mask middle digits of phone: e.g. 09171234567 -> 0917 *** 4567
  const formatMaskedPhone = (numStr: string | undefined) => {
    if (!numStr) return '';
    const raw = numStr.startsWith('0') ? numStr : `0${numStr}`;
    if (raw.length < 11) return raw;
    return `${raw.slice(0, 4)} *** ${raw.slice(7)}`;
  };

  const greetingName = user ? user.firstName : 'User';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Navigation bar */}
      <View style={styles.navigationRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.pinCard}>
          {/* Greeting */}
          <Text style={styles.titleText}>Welcome back, {greetingName}!</Text>
          <Text style={styles.subtitleText}>Enter your 4-digit PIN to secure login details for:</Text>
          <Text style={styles.phoneDisplay}>{formatMaskedPhone(phone)}</Text>

          {/* Dots Indicator */}
          <View style={styles.dotsRow}>{renderDots()}</View>

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>

      {/* Circular Standard Keypad */}
      <NumericKeypad onPress={handleKeyPress} onDelete={handleDelete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    justifyContent: 'space-between',
  },
  navigationRow: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    height: 50,
    justifyContent: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: Spacing.one,
  },
  backButtonText: {
    color: '#007CFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
  },
  pinCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2E5C',
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  subtitleText: {
    fontSize: 13,
    color: '#60646C',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.one,
  },
  phoneDisplay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007CFF',
    marginBottom: Spacing.four,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.three,
    marginVertical: Spacing.four,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#E0E1E6',
    backgroundColor: '#FFFFFF',
  },
  dotFilled: {
    backgroundColor: '#007CFF',
    borderColor: '#007CFF',
  },
  dotError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});
