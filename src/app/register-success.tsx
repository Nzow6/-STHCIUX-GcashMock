import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Spacing } from '@/constants/theme';
import { globalState } from '@/constants/state';

export default function RegisterSuccessScreen() {
  const user = globalState.registeredUser;

  const handleGetStarted = () => {
    // Log the user in
    globalState.setLoggedIn(true);
    // Replace stack to avoid back navigation to register flow
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Text style={styles.successCheck}>✓</Text>
          </View>
        </View>

        {/* Success Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.successTitle}>Account Created!</Text>
          <Text style={styles.successSubtitle}>
            Congratulations! Your GCash mock account has been created successfully.
          </Text>
        </View>

        {/* User Details Summary */}
        {user && (
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mobile Number</Text>
              <Text style={styles.detailValue}>{user.mobileNumber}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Full Name</Text>
              <Text style={styles.detailValue}>{`${user.firstName} ${user.lastName}`}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email Address</Text>
              <Text style={styles.detailValue}>{user.email}</Text>
            </View>
          </View>
        )}

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleGetStarted}
            style={({ pressed }) => [styles.getStartedButton, pressed && styles.pressed]}
          >
            <Text style={styles.buttonText}>Get Started</Text>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.four,
  },
  iconContainer: {
    marginBottom: Spacing.two,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#34C759', // High contrast iOS green
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  successCheck: {
    fontSize: 50,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  messageContainer: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  successSubtitle: {
    fontSize: 15,
    color: '#60646C',
    textAlign: 'center',
    lineHeight: 22,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: Spacing.four,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    marginVertical: Spacing.two,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  detailLabel: {
    fontSize: 14,
    color: '#60646C',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#0A2E5C',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E1E6',
  },
  buttonContainer: {
    width: '100%',
    marginTop: Spacing.two,
  },
  getStartedButton: {
    backgroundColor: '#007CFF',
    borderRadius: 16,
    paddingVertical: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
