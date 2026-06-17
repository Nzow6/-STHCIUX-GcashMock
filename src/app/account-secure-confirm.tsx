import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { globalState } from '@/constants/state';
import { Spacing } from '@/constants/theme';

const MOCK_OTP = '123456';

export default function AccountSecureConfirmScreen() {
  const [toastVisible, setToastVisible] = useState(false);

  const toastY = React.useRef(new Animated.Value(-150)).current;
  const toastOpacity = React.useRef(new Animated.Value(0)).current;

  const handleBack = () => {
    router.back();
  };

  const showToast = () => {
    setToastVisible(true);
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
  };

  const hideToast = () => {
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
    ]).start(() => setToastVisible(false));
  };

  const handleYesUnregister = () => {
    // Navigate to the existing OTP prompt.
    // Replace this screen so the user can't accidentally navigate back to the
    // confirmation page while the OTP flow is active.
    router.replace({
      pathname: '/otp',
      params: {
        phone: globalState.activeUser?.mobileNumber ?? '09171234567',
        source: 'unregister-device',
      },
    });
  };

  // Show a mock notification the moment the OTP prompt mounts.
  // In a real app the notification would be triggered by the prompt screen itself;
  // here we display it as a toast immediately after confirming so the user can see
  // the OTP without building a separate component.
  useEffect(() => {
    const timer = setTimeout(() => {
      showToast();
    }, 500);

    return () => {
      clearTimeout(timer);
      hideToast();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Account Secure</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Mock notification toast */}
      {toastVisible && (
        <Animated.View
          style={[
            styles.toast,
            {
              transform: [{ translateY: toastY }],
              opacity: toastOpacity,
            },
          ]}
        >
          <Pressable onPress={hideToast} style={styles.toastPressable}>
            <View style={styles.toastHeader}>
              <View style={styles.toastIconCircle}>
                <Text style={styles.toastIconText}>G</Text>
              </View>
              <Text style={styles.toastAppName}>GCash • now</Text>
            </View>
            <Text style={styles.toastBody}>
              Your GCash OTP is{' '}
              <Text style={styles.toastCode}>{MOCK_OTP}</Text>. Do not share this with anyone.
            </Text>
          </Pressable>
        </Animated.View>
      )}

      <View style={styles.content}>
        {/* Top icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="phone-portrait-outline" size={48} color="#1A68D6" />
          <View style={styles.unlinkBadge}>
            <Ionicons name="link-outline" size={14} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>You are about to unregister</Text>

        {/* Warning box */}
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            Unregistering this phone will require you to re-register the next time you log in to
            your GCash account.
          </Text>
        </View>

        {/* Device details box */}
        <View style={styles.detailsBox}>
          <View style={styles.detailsTop}>
            <View style={styles.currentPill}>
              <Text style={styles.currentPillText}>Current Phone</Text>
            </View>
            <Text style={styles.deviceName}>iPhone 17</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailsBottom}>
            <Text style={styles.registeredDateLabel}>Registered Date</Text>
            <Text style={styles.registeredDateValue}>Mar 18, 2026 12:05PM</Text>
          </View>
        </View>

        <Text style={styles.confirmText}>
          Are you sure you want to unregister this phone? Once confirmed, this phone will be logged
          out.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleYesUnregister}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryButtonText}>Yes, Unregister</Text>
        </Pressable>
        <Pressable
          onPress={handleBack}
          style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}
        >
          <Text style={styles.outlineButtonText}>No</Text>
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
  header: {
    height: 56,
    backgroundColor: '#1A68D6',
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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastIconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
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
    paddingTop: Spacing.five,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.three,
    position: 'relative',
  },
  unlinkBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1A68D6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2E5C',
    textAlign: 'center',
    marginBottom: Spacing.three,
  },
  warningBox: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: Spacing.three,
    marginBottom: Spacing.four,
    width: '100%',
  },
  warningText: {
    fontSize: 13,
    color: '#5C4B00',
    textAlign: 'center',
    lineHeight: 18,
  },
  detailsBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: Spacing.four,
  },
  detailsTop: {
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  currentPill: {
    backgroundColor: '#E6F9ED',
    borderRadius: 12,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
  },
  currentPillText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1B7A3E',
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A2E5C',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E1E6',
  },
  detailsBottom: {
    padding: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  registeredDateLabel: {
    fontSize: 13,
    color: '#60646C',
  },
  registeredDateValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  confirmText: {
    fontSize: 13,
    color: '#60646C',
    textAlign: 'center',
    lineHeight: 18,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    gap: Spacing.two,
  },
  primaryButton: {
    backgroundColor: '#1A68D6',
    borderRadius: 24,
    paddingVertical: Spacing.two + 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: '#1A68D6',
    borderRadius: 24,
    paddingVertical: Spacing.two + 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#1A68D6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
  },
});
