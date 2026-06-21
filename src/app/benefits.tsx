import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/screen-header';
import { Spacing } from '@/constants/theme';

export default function BenefitsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScreenHeader title="Your Benefits" backgroundColor="#0A2E5C" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>✓</Text>
          </View>
          <Text style={styles.tierName}>Fully Verified</Text>
          <Text style={styles.tierDesc}>You have unlocked all GCash features!</Text>
        </View>

        <Text style={styles.sectionTitle}>What you can do</Text>
        <View style={styles.featuresCard}>
          {[
            { icon: '💸', text: 'Send Money up to ₱100k' },
            { icon: '🏦', text: 'Bank Transfer' },
            { icon: '💳', text: 'Get a GCash Mastercard' },
            { icon: '📈', text: 'Invest with GInvest' },
            { icon: '🛡️', text: 'Insure with GInsure' },
          ].map((feat, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{feat.icon}</Text>
              <Text style={styles.featureText}>{feat.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9' },
  content: { paddingBottom: Spacing.six },
  heroCard: {
    backgroundColor: '#0A2E5C',
    padding: Spacing.six,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: Spacing.four,
  },
  badge: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#34C759',
    justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.three,
    borderWidth: 4, borderColor: 'rgba(255,255,255,0.2)'
  },
  badgeIcon: { color: '#FFFFFF', fontSize: 30, fontWeight: 'bold' },
  tierName: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginBottom: Spacing.one },
  tierDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0A2E5C', marginHorizontal: Spacing.four, marginBottom: Spacing.two },
  featuresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: Spacing.four,
    padding: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  featureRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.three, borderBottomWidth: 1, borderBottomColor: '#EFEFEF' },
  featureIcon: { fontSize: 24, marginRight: Spacing.three },
  featureText: { fontSize: 16, color: '#0A2E5C', fontWeight: '500' },
});
