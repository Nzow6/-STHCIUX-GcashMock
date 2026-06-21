import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/screen-header';
import { Spacing } from '@/constants/theme';

export default function ProfileLimitsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScreenHeader title="Profile Limits" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Wallet Limits</Text>
          <View style={styles.limitRow}>
            <Text style={styles.limitLabel}>Wallet Balance</Text>
            <Text style={styles.limitValue}>₱100,000.00</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '45%' }]} />
          </View>
          <Text style={styles.limitHint}>You have ₱55,000.00 space left.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Daily Outgoing Limit</Text>
          <View style={styles.limitRow}>
            <Text style={styles.limitLabel}>Amount Used</Text>
            <Text style={styles.limitValue}>₱0.00 / ₱100,000.00</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '0%' }]} />
          </View>
          <Text style={styles.limitHint}>Resets daily at 12:00 AM.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Monthly Incoming Limit</Text>
          <View style={styles.limitRow}>
            <Text style={styles.limitLabel}>Amount Received</Text>
            <Text style={styles.limitValue}>₱10,000.00 / ₱500,000.00</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '2%' }]} />
          </View>
          <Text style={styles.limitHint}>Resets on the 1st of every month.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9' },
  content: { padding: Spacing.four, gap: Spacing.four },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0A2E5C', marginBottom: Spacing.three },
  limitRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.two },
  limitLabel: { fontSize: 14, color: '#60646C', fontWeight: '500' },
  limitValue: { fontSize: 14, color: '#0A2E5C', fontWeight: 'bold' },
  progressBarBg: { height: 8, backgroundColor: '#E0E1E6', borderRadius: 4, overflow: 'hidden', marginBottom: Spacing.two },
  progressBarFill: { height: '100%', backgroundColor: '#007CFF' },
  limitHint: { fontSize: 12, color: '#8E8E93' },
});
