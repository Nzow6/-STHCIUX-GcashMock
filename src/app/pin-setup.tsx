import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { NumericKeypad } from '@/components/numeric-keypad';
import { Spacing } from '@/constants/theme';
import { globalState } from '@/constants/state';

export default function PINSetupScreen() {
  const { phone, firstName, lastName, email } = useLocalSearchParams<{
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
  }>();

  const [step, setStep] = useState<'setup' | 'confirm'>('setup');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleKeyPress = (digit: string) => {
    setError(null);
    if (step === 'setup') {
      if (pin.length < 4) {
        const nextPin = pin + digit;
        setPin(nextPin);

        // Auto-progress to confirmation step
        if (nextPin.length === 4) {
          setTimeout(() => {
            setStep('confirm');
          }, 300);
        }
      }
    } else {
      if (confirmPin.length < 4) {
        const nextConfirm = confirmPin + digit;
        setConfirmPin(nextConfirm);

        // Verify PINs when 4 digits are completed
        if (nextConfirm.length === 4) {
          if (pin === nextConfirm) {
            // Save to global state!
            globalState.setRegisteredUser({
              mobileNumber: phone || '',
              firstName: firstName || '',
              lastName: lastName || '',
              email: email || '',
              pin: pin,
            });

            // Redirect to success screen
            setTimeout(() => {
              router.push('/register-success');
            }, 300);
          } else {
            setTimeout(() => {
              setError('PINs do not match. Let\'s set your PIN again.');
              setPin('');
              setConfirmPin('');
              setStep('setup');
            }, 300);
          }
        }
      }
    }
  };

  const handleDelete = () => {
    setError(null);
    if (step === 'setup') {
      setPin((prev) => prev.slice(0, -1));
    } else {
      setConfirmPin((prev) => prev.slice(0, -1));
    }
  };

  const handleBack = () => {
    if (step === 'confirm') {
      setConfirmPin('');
      setStep('setup');
    } else {
      router.back();
    }
  };

  // Render the 4 dots/circles
  const renderDots = () => {
    const dots = [];
    const activeLength = step === 'setup' ? pin.length : confirmPin.length;
    for (let i = 0; i < 4; i++) {
      const isFilled = i < activeLength;
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

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Navigation Row */}
      <View style={styles.navigationRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Text style={styles.backButtonText}>← {step === 'confirm' ? 'Back to Setup' : 'Back'}</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.pinCard}>
          <Text style={styles.titleText}>
            {step === 'setup' ? 'Set 4-Digit PIN' : 'Confirm 4-Digit PIN'}
          </Text>
          <Text style={styles.subtitleText}>
            {step === 'setup'
              ? 'Create a secure 4-digit PIN to access your GCash account.'
              : 'Please enter the 4-digit PIN again to confirm.'}
          </Text>

          {/* Dots Indicator */}
          <View style={styles.dotsRow}>{renderDots()}</View>

          {/* Error display */}
          {error && <Text style={styles.errorText}>{error}</Text>}
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
    gap: Spacing.four,
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
