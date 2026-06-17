import React from 'react';
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

const PARTNER_BANKS = ['CIMB', 'BPI', 'UNO Bank', 'Maybank', 'Cebuana'];

const TRANSACTIONS = [
  { id: '1', title: 'Interest Payout', date: 'Jun 15, 2026', amount: '+₱125.00', type: 'credit' },
  { id: '2', title: 'Deposit from GCash', date: 'Jun 10, 2026', amount: '+₱5,000.00', type: 'credit' },
  { id: '3', title: 'Withdraw to GCash', date: 'Jun 5, 2026', amount: '-₱1,000.00', type: 'debit' },
  { id: '4', title: 'Interest Payout', date: 'May 15, 2026', amount: '+₱98.50', type: 'credit' },
];

export default function GSaveScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScreenHeader title="GSave" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Total Savings Balance</Text>
            <Text style={styles.balanceValue}>₱ 25,000.00</Text>
            <View style={styles.interestRow}>
              <Text style={styles.interestLabel}>Interest Earned</Text>
              <Text style={styles.interestValue}>+₱1,250.00</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}>
              <Text style={styles.actionButtonText}>Deposit</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}>
              <Text style={styles.actionButtonText}>Withdraw</Text>
            </Pressable>
          </View>

          {/* Partner Banks */}
          <Text style={styles.sectionTitle}>Partner Banks</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.partnerScroll}
          >
            {PARTNER_BANKS.map((bank) => (
              <View key={bank} style={styles.partnerCard}>
                <Text style={styles.partnerText}>{bank}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Transaction History */}
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <FlatList
            data={TRANSACTIONS}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionRow}>
                <View>
                  <Text style={styles.transactionTitle}>{item.title}</Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    item.type === 'credit' ? styles.credit : styles.debit,
                  ]}
                >
                  {item.amount}
                </Text>
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#F4F6F9',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  scrollContent: {
    padding: Spacing.three,
    paddingBottom: Spacing.six,
  },
  balanceCard: {
    backgroundColor: '#007CFF',
    borderRadius: 16,
    padding: Spacing.four,
    marginBottom: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: Spacing.one,
  },
  interestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  interestLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
  },
  interestValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007CFF',
    paddingVertical: Spacing.three,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  partnerScroll: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  partnerCard: {
    width: 100,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerText: {
    color: '#0A2E5C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    borderRadius: 12,
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  transactionDate: {
    fontSize: 12,
    color: '#60646C',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  credit: {
    color: '#34C759',
  },
  debit: {
    color: '#FF3B30',
  },
  pressed: {
    opacity: 0.8,
  },
});
