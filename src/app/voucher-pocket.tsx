import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/screen-header';
import { Spacing } from '@/constants/theme';

export default function VoucherPocketScreen() {
  const VOUCHERS = [
    { id: '1', title: '₱50 Off Load', expiry: 'Expires in 2 days', color: '#FF3B30' },
    { id: '2', title: 'Free Bank Transfer', expiry: 'Expires in 5 days', color: '#007CFF' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScreenHeader title="Voucher Pocket" />
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.activeTab]}>Active</Text>
        <Text style={styles.tab}>Past</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {VOUCHERS.map(voucher => (
          <View key={voucher.id} style={[styles.voucherCard, { borderLeftColor: voucher.color }]}>
            <View style={styles.voucherContent}>
              <Text style={styles.voucherTitle}>{voucher.title}</Text>
              <Text style={styles.voucherExpiry}>{voucher.expiry}</Text>
            </View>
            <Pressable style={[styles.useBtn, { backgroundColor: voucher.color }]}>
              <Text style={styles.useBtnText}>Use Now</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9' },
  tabs: { flexDirection: 'row', backgroundColor: '#FFFFFF', paddingHorizontal: Spacing.four, borderBottomWidth: 1, borderBottomColor: '#E0E1E6' },
  tab: { paddingVertical: Spacing.three, paddingHorizontal: Spacing.four, fontSize: 14, fontWeight: 'bold', color: '#8E8E93' },
  activeTab: { color: '#007CFF', borderBottomWidth: 3, borderBottomColor: '#007CFF' },
  content: { padding: Spacing.four, gap: Spacing.three },
  voucherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderLeftWidth: 6,
    padding: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderStyle: 'dashed',
    borderColor: '#E0E1E6',
    borderWidth: 1,
  },
  voucherContent: { flex: 1 },
  voucherTitle: { fontSize: 16, fontWeight: 'bold', color: '#0A2E5C', marginBottom: 4 },
  voucherExpiry: { fontSize: 12, color: '#FF3B30', fontWeight: '500' },
  useBtn: { borderRadius: 20, paddingHorizontal: Spacing.four, paddingVertical: Spacing.two },
  useBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
});
