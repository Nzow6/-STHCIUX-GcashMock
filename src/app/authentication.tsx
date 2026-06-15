import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NumericKeypad } from '@/components/numeric-keypad';
import { DEFAULT_USER } from '@/constants/default-user';
import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function AuthenticationScreen() {
  const [code, setCode] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toastY = useRef(new Animated.Value(-150)).current;
  const toastOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(randomCode);

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastY, { toValue: 20, duration: 600, useNativeDriver: true }),
        Animated.timing(toastOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]).start();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (digit: string) => {
    if (code.length < 6) {
      setError(null);
      const newCode = code + digit;
      setCode(newCode);

      if (newCode.length === 6) {
        if (newCode === otpCode) {
          setTimeout(() => router.push('/edit-email'), 300);
        } else {
          setError('Incorrect authentication code. Please try again.');
        }
      }
    }
  };

  const handleDelete = () => {
    if (code.length > 0) {
      setError(null);
      setCode((prev) => prev.slice(0, -1));
    }
  };

  const handleResend = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(newOtp);
    setCode('');
    setError(null);
    Animated.parallel([
      Animated.timing(toastY, { toValue: -150, duration: 300, useNativeDriver: true }),
      Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(toastY, { toValue: 20, duration: 600, useNativeDriver: true }),
          Animated.timing(toastOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]).start();
      }, 1000);
    });
  };

  const handleAutofill = () => {
    setCode(otpCode);
    setError(null);
    setTimeout(() => router.push('/edit-email'), 500);
  };

  const renderCodeBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      const char = code[i] || '';
      const isFocused = code.length === i;
      boxes.push(
        <View
          key={i}
          style={[
            styles.codeBox,
            isFocused && styles.codeBoxFocused,
            error && styles.codeBoxError,
          ]}
        >
          <Text style={styles.codeText}>{char}</Text>
        </View>
      );
    }
    return boxes;
  };

  const formattedPhone = DEFAULT_USER.mobileNumber.startsWith('0')
    ? `+63 ${DEFAULT_USER.mobileNumber.slice(1, 4)} ${DEFAULT_USER.mobileNumber.slice(4, 7)} ${DEFAULT_USER.mobileNumber.slice(7)}`
    : DEFAULT_USER.mobileNumber;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Authentication</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Simulated SMS Toast */}
      <Animated.View
        style={[
          styles.toast,
          { transform: [{ translateY: toastY }], opacity: toastOpacity },
        ]}
      >
        <Pressable onPress={handleAutofill} style={styles.toastPressable}>
          <View style={styles.toastHeader}>
            <View style={styles.toastIconCircle}>
              <Text style={styles.toastIconText}>G</Text>
            </View>
            <Text style={styles.toastAppName}>MESSAGES • now</Text>
          </View>
          <Text style={styles.toastBody}>
            GCash: Your authentication OTP code is <Text style={styles.toastCode}>{otpCode}</Text>. Valid for 5 minutes.
          </Text>
        </Pressable>
      </Animated.View>

      <View style={styles.content}>
        {/* Instruction Box */}
        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>Verify with Text Message</Text>
          <Text style={styles.instructionText}>
            A 6-digit code was sent to {formattedPhone}
          </Text>
        </View>

        <Text style={styles.promptText}>Please enter the authentication code.</Text>

        <View style={styles.codeRow}>{renderCodeBoxes()}</View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Pressable onPress={handleResend} style={({ pressed }) => [styles.resendButton, pressed && styles.pressed]}>
          <Text style={styles.resendText}>
            Didn't get the code? <Text style={styles.resendLink}>Click here to resend</Text>
          </Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => code === otpCode && router.push('/edit-email')}
          style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}
        >
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </Pressable>
      </View>

      <NumericKeypad onPress={handleKeyPress} onDelete={handleDelete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
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
  toast: {
    position: 'absolute',
    top: 56,
    left: Spacing.four,
    right: Spacing.four,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    zIndex: 100,
  },
  toastPressable: {
    width: '100%',
  },
  toastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  toastIconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastIconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  toastAppName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#60646C',
    letterSpacing: 0.5,
  },
  toastBody: {
    fontSize: 14,
    color: '#0A2E5C',
    lineHeight: 18,
  },
  toastCode: {
    fontWeight: '900',
    color: '#007CFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    alignItems: 'center',
  },
  instructionBox: {
    backgroundColor: '#F0F0F3',
    borderRadius: 12,
    padding: Spacing.three,
    width: '100%',
    marginBottom: Spacing.four,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.one,
  },
  instructionText: {
    fontSize: 13,
    color: '#60646C',
    lineHeight: 18,
  },
  promptText: {
    fontSize: 14,
    color: '#60646C',
    marginBottom: Spacing.three,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Spacing.three,
  },
  codeBox: {
    width: '13%',
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: '#E0E1E6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  codeBoxFocused: {
    borderColor: '#007CFF',
    shadowColor: '#007CFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  codeBoxError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF2F2',
  },
  codeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.two,
  },
  resendButton: {
    padding: Spacing.one,
  },
  resendText: {
    color: '#60646C',
    fontSize: 13,
  },
  resendLink: {
    color: '#007CFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  submitButton: {
    backgroundColor: '#007CFF',
    borderRadius: 24,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
