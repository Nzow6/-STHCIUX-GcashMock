import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { NumericKeypad } from '@/components/numeric-keypad';
import { Spacing } from '@/constants/theme';
import { globalState } from '@/constants/state';

export default function WelcomeScreen() {
  const [phone, setPhone] = useState('');

  const handleKeyPress = (digit: string) => {
    // PH Mobile numbers start with 9 after +63.
    // If the input is empty and the user clicks something else than 9, ignore it or force 9.
    if (phone.length === 0 && digit !== '9') {
      return;
    }

    if (phone.length < 10) {
      setPhone((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setPhone((prev) => prev.slice(0, -1));
  };

  const handleNext = () => {
    if (phone.length === 10) {
      const fullNumber = `0${phone}`; // E.g., 09171234567

      // Check if user is registered in our mock state (either custom or default)
      const user = globalState.getUser(fullNumber);

      if (user) {
        // Redirect to Login PIN screen (Task 2)
        router.push({
          pathname: '/login-pin',
          params: { phone: fullNumber },
        });
      } else {
        // Proceed to OTP Registration flow
        router.push({
          pathname: '/otp',
          params: { phone: fullNumber },
        });
      }
    }
  };

  const formatDisplay = (num: string) => {
    // Formats string as: 9XX XXX XXXX
    let formatted = '';
    for (let i = 0; i < num.length; i++) {
      if (i === 3 || i === 6) {
        formatted += ' ';
      }
      formatted += num[i];
    }
    // Pad rest with placeholders
    const placeholders = ['9', 'X', 'X', ' ', 'X', 'X', 'X', ' ', 'X', 'X', 'X', 'X'];
    let placeholderStr = '';
    let spaceOffset = 0;
    
    for (let i = formatted.length; i < 12; i++) {
      placeholderStr += placeholders[i];
    }

    return {
      typed: formatted,
      remaining: placeholderStr,
    };
  };

  const display = formatDisplay(phone);
  const isValid = phone.length === 10;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.content}>
        {/* Branding header */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/GCashLogo.png')} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
        </View>

        {/* Input container card */}
        <View style={styles.inputCard}>
          <Text style={styles.titleText}>Enter Mobile Number</Text>
          <Text style={styles.subtitleText}>
            We'll send a 6-digit authentication code to verify your phone number.
          </Text>

          {/* Large text input display */}
          <View style={styles.phoneInputRow}>
            <Text style={styles.countryCode}>+63</Text>
            <View style={styles.phoneDisplayContainer}>
              <Text style={styles.phoneTypedText}>
                {display.typed}
                <Text style={styles.phonePlaceholderText}>{display.remaining}</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Big high-contrast "Next" button */}
        <View style={styles.buttonContainer}>
          <Pressable
            disabled={!isValid}
            onPress={handleNext}
            style={({ pressed }) => [
              styles.nextButton,
              !isValid && styles.disabledButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>
        </View>
      </View>

      {/* Accessible Custom Numeric Keypad */}
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
    gap: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  logoImage: {
    height: 48,
    width: 200,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
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
    marginBottom: Spacing.three,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: '#FFFFFF',
  },
  countryCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginRight: Spacing.two,
    borderRightWidth: 1,
    borderRightColor: '#E0E1E6',
    paddingRight: Spacing.two,
  },
  phoneDisplayContainer: {
    flex: 1,
  },
  phoneTypedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2E5C',
    letterSpacing: 1.5,
  },
  phonePlaceholderText: {
    color: '#B0B4BA',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: Spacing.two,
  },
  nextButton: {
    backgroundColor: '#007CFF',
    borderRadius: 24,
    paddingVertical: Spacing.two + 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
