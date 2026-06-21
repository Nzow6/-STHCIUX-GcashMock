import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/screen-header';
import { Spacing } from '@/constants/theme';

export default function TermsConditionsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScreenHeader title="Terms and Conditions" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>Last Updated: June 22, 2026</Text>
        
        <Text style={styles.heading}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By using the GCash Mock App, you agree to these mock Terms and Conditions. These terms govern your simulated transactions, account balances, and interactions within the prototype environment.
        </Text>

        <Text style={styles.heading}>2. Mock Transactions</Text>
        <Text style={styles.paragraph}>
          All transactions are simulated. No real money is exchanged, held, or transferred. The wallet limits and balances shown are for demonstration purposes only.
        </Text>

        <Text style={styles.heading}>3. User Privacy</Text>
        <Text style={styles.paragraph}>
          We respect your privacy. Any mock data entered during registration is stored locally on your device for testing the authentication and profiling flows.
        </Text>

        <Text style={styles.heading}>4. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          The developers are not responsible for any misunderstanding of the app's prototype nature. Do not input real banking credentials.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: Spacing.four },
  lastUpdated: { fontSize: 12, color: '#8E8E93', marginBottom: Spacing.four, fontStyle: 'italic' },
  heading: { fontSize: 16, fontWeight: 'bold', color: '#0A2E5C', marginBottom: Spacing.two, marginTop: Spacing.three },
  paragraph: { fontSize: 14, color: '#60646C', lineHeight: 22, marginBottom: Spacing.two },
});
