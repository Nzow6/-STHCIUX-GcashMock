import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/screen-header';
import { Spacing } from '@/constants/theme';

const ACCOUNTS = [
  { id: '1', name: 'BPI', status: 'Linked', icon: '🏦' },
  { id: '2', name: 'UnionBank', status: 'Not Linked', icon: '🏦' },
  { id: '3', name: 'PayPal', status: 'Not Linked', icon: '🅿️' },
  { id: '4', name: 'Payoneer', status: 'Not Linked', icon: '💰' },
];

export default function LinkedAccountsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScreenHeader title="My Linked Accounts" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Link your preferred accounts to cash in and cash out easily.
        </Text>
        
        {ACCOUNTS.map(account => (
          <View key={account.id} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.icon}>{account.icon}</Text>
              <View style={styles.details}>
                <Text style={styles.name}>{account.name}</Text>
                <Text style={[styles.status, account.status === 'Linked' && styles.statusLinked]}>
                  {account.status}
                </Text>
              </View>
              <Pressable style={styles.actionBtn}>
                <Text style={styles.actionText}>{account.status === 'Linked' ? 'Manage' : 'Link'}</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9' },
  content: { padding: Spacing.four, gap: Spacing.three },
  description: { fontSize: 14, color: '#60646C', marginBottom: Spacing.two, paddingHorizontal: Spacing.one },
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
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: 32, marginRight: Spacing.three },
  details: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#0A2E5C', marginBottom: 2 },
  status: { fontSize: 12, color: '#8E8E93', fontWeight: '500' },
  statusLinked: { color: '#34C759' },
  actionBtn: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: '#E6F2FF',
    borderRadius: 20,
  },
  actionText: { color: '#007CFF', fontWeight: 'bold', fontSize: 12 },
});
