import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NumericKeypad } from '@/components/numeric-keypad';
import { globalState, useGlobalState } from '@/constants/state';
import { Spacing } from '@/constants/theme';

export default function WelcomeScreen() {
  const state = useGlobalState();
  const [screenState, setScreenState] = useState<'phone' | 'good-day' | 'pin'>('good-day');
  const [phone, setPhone] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Sync number and state on mount/focus
  useEffect(() => {
    const registeredNumber = globalState.registeredUser?.mobileNumber || '09171234567';
    setPhone(registeredNumber);
    setScreenState('good-day');
  }, [state.registeredUser, state.isLoggedIn]);

  // Keypad Handlers
  const handlePhoneKeyPress = (digit: string) => {
    // PH Mobile numbers start with 9 after +63
    if (phone.length === 0 && digit !== '9') {
      return;
    }
    if (phone.length < 10) {
      setPhone((prev) => prev + digit);
    }
  };

  const handlePinKeyPress = (digit: string) => {
    if (pinCode.length < 4) {
      setError(null);
      const nextPin = pinCode + digit;
      setPinCode(nextPin);

      // Auto-validate when 4 digits are completed
      if (nextPin.length === 4) {
        const user = globalState.getUser(phone);
        if (user && nextPin === user.pin) {
          globalState.setActiveUser(user);
          globalState.setLoggedIn(true);
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 300);
        } else {
          setTimeout(() => {
            setError('Incorrect PIN. Please try again.');
            setPinCode('');
          }, 300);
        }
      }
    }
  };

  const handleKeyPress = (digit: string) => {
    if (screenState === 'phone') {
      handlePhoneKeyPress(digit);
    } else if (screenState === 'pin') {
      handlePinKeyPress(digit);
    }
  };

  const handleDelete = () => {
    setError(null);
    if (screenState === 'phone') {
      setPhone((prev) => prev.slice(0, -1));
    } else if (screenState === 'pin') {
      setPinCode((prev) => prev.slice(0, -1));
    }
  };

  // Navigation Logic
  const handleNextPhone = () => {
    if (phone.length === 10) {
      const fullNumber = `0${phone}`;
      const user = globalState.getUser(fullNumber);

      if (user) {
        setPhone(fullNumber);
        setScreenState('good-day');
      } else {
        router.push({
          pathname: '/otp',
          params: { phone: fullNumber },
        });
      }
    }
  };

  const handleSwapNumber = () => {
    setPhone('');
    setPinCode('');
    setError(null);
    setScreenState('phone');
  };

  const handleBiometricsLogin = () => {
    const user = globalState.getUser(phone);
    if (user) {
      Alert.alert(
        'Biometrics Login',
        'Simulating face/fingerprint authentication...',
        [
          {
            text: 'Authenticate',
            onPress: () => {
              globalState.setActiveUser(user);
              globalState.setLoggedIn(true);
              router.replace('/(tabs)');
            },
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  const handleMpinClick = () => {
    setPinCode('');
    setError(null);
    setScreenState('pin');
  };

  const formatDisplay = (num: string) => {
    let formatted = '';
    for (let i = 0; i < num.length; i++) {
      if (i === 3 || i === 6) {
        formatted += ' ';
      }
      formatted += num[i];
    }
    const placeholders = ['9', 'X', 'X', ' ', 'X', 'X', 'X', ' ', 'X', 'X', 'X', 'X'];
    let placeholderStr = '';
    for (let i = formatted.length; i < 12; i++) {
      placeholderStr += placeholders[i];
    }
    return {
      typed: formatted,
      remaining: placeholderStr,
    };
  };

  const renderPinDots = () => {
    const dots = [];
    for (let i = 0; i < 4; i++) {
      const isFilled = i < pinCode.length;
      dots.push(
        <View
          key={i}
          style={[
            styles.pinDot,
            isFilled && styles.pinDotFilled,
            error && styles.pinDotError,
          ]}
        />
      );
    }
    return dots;
  };

  // Rendering Layouts based on screenState
  if (screenState === 'phone') {
    const display = formatDisplay(phone);
    const isValid = phone.length === 10;

    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar style="dark" />
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/GCashLogo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.inputCard}>
            <Text style={styles.titleText}>Enter Mobile Number</Text>
            <Text style={styles.subtitleText}>
              {"We'll send a 6-digit authentication code to verify your phone number."}
            </Text>

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

          <View style={styles.buttonContainer}>
            <Pressable
              disabled={!isValid}
              onPress={handleNextPhone}
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

        <NumericKeypad onPress={handleKeyPress} onDelete={handleDelete} />
      </SafeAreaView>
    );
  }

  if (screenState === 'good-day') {
    return (
      <SafeAreaView style={styles.blueContainer} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar style="light" />
        <View style={styles.blueContent}>
          {/* Logo */}
          <View style={styles.blueLogoContainer}>
            <Image
              source={require('../../assets/images/GCashLogo.png')}
              style={styles.blueLogoImage}
              resizeMode="contain"
            />
          </View>

          {/* Good Day Greeting */}
          <Text style={styles.greetingText}>Good Day!</Text>

          {/* Prefilled Number Pill with Swap Icon */}
          <Pressable onPress={handleSwapNumber} style={styles.phonePill}>
            <Text style={styles.phonePillText}>{phone}</Text>
            <Ionicons name="swap-horizontal" size={18} color="#FFFFFF" />
          </Pressable>

          {/* Biometrics & MPIN login options Card */}
          <View style={styles.biometricsMpinCard}>
            <Pressable
              onPress={handleBiometricsLogin}
              style={({ pressed }) => [styles.biometricsMpinButton, pressed && styles.pressed]}
            >
              <Ionicons name="finger-print-outline" size={36} color="#007CFF" />
              <Text style={styles.biometricsMpinText}>Biometrics Login</Text>
            </Pressable>

            <View style={styles.verticalDivider} />

            <Pressable
              onPress={handleMpinClick}
              style={({ pressed }) => [styles.biometricsMpinButton, pressed && styles.pressed]}
            >
              <Ionicons name="grid-outline" size={36} color="#007CFF" />
              <Text style={styles.biometricsMpinText}>MPIN Login</Text>
            </Pressable>
          </View>

          {/* Bottom Footer Links */}
          <View style={styles.blueFooter}>
            <Pressable onPress={() => Alert.alert('Help Center', 'Redirecting to Help Center...')}>
              <Text style={styles.footerLink}>Help Center</Text>
            </Pressable>
            <Pressable onPress={() => Alert.alert('Forgot MPIN', 'Feature under construction.')}>
              <Text style={styles.footerLink}>Forgot MPIN?</Text>
            </Pressable>
          </View>
          <Text style={styles.versionText}>v6.00.0:1120</Text>
        </View>
      </SafeAreaView>
    );
  }

  // screenState === 'pin'
  return (
    <SafeAreaView style={styles.blueContainer} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar style="light" />
      <View style={styles.pinHeaderArea}>
        <Image
          source={require('../../assets/images/GCashLogo.png')}
          style={styles.blueLogoImage}
          resizeMode="contain"
        />
        <Text style={styles.greetingText}>Good Day!</Text>

        <Pressable onPress={handleSwapNumber} style={styles.phonePill}>
          <Text style={styles.phonePillText}>{phone}</Text>
          <Ionicons name="swap-horizontal" size={18} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.pinPromptText}>Enter your MPIN</Text>

        {/* Dots */}
        <View style={styles.pinDotsRow}>{renderPinDots()}</View>

        {error && <Text style={styles.pinErrorText}>{error}</Text>}

        <Text style={styles.pinWarningText}>Never share your MPIN or OTP with anyone.</Text>
      </View>

      {/* White Keypad Section at the Bottom */}
      <View style={styles.whiteKeypadArea}>
        <NumericKeypad onPress={handleKeyPress} onDelete={handleDelete} />

        <View style={styles.blueKeypadLinkRow}>
          <Pressable onPress={() => Alert.alert('Help Center', 'Redirecting to Help Center...')}>
            <Text style={styles.blueKeypadLink}>Help Center</Text>
          </Pressable>
          <Pressable onPress={() => Alert.alert('Forgot MPIN', 'Feature under construction.')}>
            <Text style={styles.blueKeypadLink}>Forgot MPIN?</Text>
          </Pressable>
        </View>
      </View>
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

  // Blue Theme Styles (Screenshots 1 & 2)
  blueContainer: {
    flex: 1,
    backgroundColor: '#007CFF',
    justifyContent: 'space-between',
  },
  blueContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
  },
  blueLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.six,
  },
  blueLogoImage: {
    height: 48,
    width: 200,
    tintColor: '#FFFFFF',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: Spacing.three,
    textAlign: 'center',
  },
  phonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingVertical: Spacing.one + 2,
    paddingHorizontal: Spacing.five,
    borderRadius: 20,
    marginTop: Spacing.three,
  },
  phonePillText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: Spacing.two,
    letterSpacing: 0.5,
  },
  biometricsMpinCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    paddingVertical: Spacing.four,
    marginHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 'auto',
    marginBottom: Spacing.six,
  },
  biometricsMpinButton: {
    alignItems: 'center',
    width: '45%',
    paddingVertical: Spacing.two,
  },
  biometricsMpinText: {
    color: '#007CFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: Spacing.two,
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#E0E1E6',
  },
  blueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.two,
  },
  footerLink: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: Spacing.four,
  },

  // PIN state top layout
  pinHeaderArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  pinPromptText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: Spacing.five,
    textAlign: 'center',
  },
  pinWarningText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: Spacing.two,
    marginBottom: Spacing.three,
  },
  pinDotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: Spacing.three,
  },
  pinDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  pinDotFilled: {
    backgroundColor: '#FFFFFF',
  },
  pinDotError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FF3B30',
  },
  pinErrorText: {
    color: '#FFD60A',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Spacing.one,
  },
  whiteKeypadArea: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: Spacing.three,
  },
  blueKeypadLinkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.six,
    paddingVertical: Spacing.four,
    backgroundColor: '#FFFFFF',
  },
  blueKeypadLink: {
    color: '#007CFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
