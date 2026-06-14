import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { NumericKeypad } from '@/components/numeric-keypad';
import { Spacing } from '@/constants/theme';

export default function OTPScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [code, setCode] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Animated values for premium SMS Toast
  const toastY = React.useRef(new Animated.Value(-150)).current;
  const toastOpacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Generate random 6-digit code on mount
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(randomCode);

    // Show mock SMS Notification after 1.5 seconds
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastY, {
          toValue: 20,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(toastOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (digit: string) => {
    if (code.length < 6) {
      setError(null);
      const newCode = code + digit;
      setCode(newCode);

      // Auto-submit when 6 digits are typed
      if (newCode.length === 6) {
        if (newCode === otpCode) {
          // Proceed to Registration Details form
          setTimeout(() => {
            router.push({
              pathname: '/register',
              params: { phone },
            });
          }, 300);
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
    // Hide toast then show it again after 1 second
    Animated.parallel([
      Animated.timing(toastY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(toastY, {
            toValue: 20,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(toastOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start();
      }, 1000);
    });
  };

  const handleBack = () => {
    router.back();
  };

  // Render the 6 OTP input box indicators
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

  // Format phone number for readable display: e.g. +63 917 123 4567
  const formatPhoneDisplay = (numStr: string | undefined) => {
    if (!numStr) return '+63 9XX XXX XXXX';
    // Remove leading 0 if present (e.g. 09171234567 -> 9171234567)
    const raw = numStr.startsWith('0') ? numStr.slice(1) : numStr;
    return `+63 ${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6)}`;
  };

  const handleAutofill = () => {
    setCode(otpCode);
    setError(null);
    setTimeout(() => {
      router.push({
        pathname: '/register',
        params: { phone },
      });
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Back button */}
      <View style={styles.navigationRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
      </View>

      {/* Simulated SMS Notification Toast */}
      <Animated.View
        style={[
          styles.toast,
          {
            transform: [{ translateY: toastY }],
            opacity: toastOpacity,
          },
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
        <View style={styles.otpCard}>
          <Text style={styles.titleText}>Verification Code</Text>
          <Text style={styles.subtitleText}>
            Please enter the 6-digit authentication code sent to your registered mobile number:
          </Text>
          <Text style={styles.phoneDisplay}>{formatPhoneDisplay(phone)}</Text>

          {/* 6 Digit Boxes */}
          <View style={styles.codeRow}>{renderCodeBoxes()}</View>

          {/* Error message */}
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Resend button */}
          <Pressable onPress={handleResend} style={({ pressed }) => [styles.resendButton, pressed && styles.pressed]}>
            <Text style={styles.resendText}>
              Didn't receive the code? <Text style={styles.resendLink}>Resend OTP</Text>
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Accessible Keypad */}
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
    zIndex: 2,
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
  toast: {
    position: 'absolute',
    top: 50,
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
    justifyContent: 'center',
    gap: Spacing.four,
  },
  otpCard: {
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
    marginBottom: Spacing.two,
  },
  phoneDisplay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007CFF',
    marginBottom: Spacing.four,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: Spacing.two,
  },
  codeBox: {
    width: '13%',
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: '#E0E1E6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F9',
  },
  codeBoxFocused: {
    borderColor: '#007CFF',
    backgroundColor: '#FFFFFF',
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
    marginTop: Spacing.two,
  },
  resendButton: {
    marginTop: Spacing.four,
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
  pressed: {
    opacity: 0.7,
  },
});
