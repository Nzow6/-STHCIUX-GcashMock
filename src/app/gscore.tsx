import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/screen-header';
import { Spacing } from '@/constants/theme';

export default function GScoreScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScreenHeader title="GScore" backgroundColor="#0A2E5C" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Your GScore</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreValue}>580</Text>
            <Text style={styles.scoreTier}>GOOD</Text>
          </View>
          <Text style={styles.heroSubtitle}>Keep using GCash to increase your score!</Text>
        </View>

        <Text style={styles.sectionTitle}>Unlocked Benefits</Text>
        <View style={styles.benefitsGrid}>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>💸</Text>
            <Text style={styles.benefitTitle}>GLoan</Text>
            <Text style={styles.benefitDesc}>Up to ₱25,000</Text>
          </View>
          <View style={styles.benefitCard}>
            <Text style={styles.benefitIcon}>🛍️</Text>
            <Text style={styles.benefitTitle}>GGives</Text>
            <Text style={styles.benefitDesc}>Pay in Installments</Text>
          </View>
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
  },
  heroTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '500', marginBottom: Spacing.four },
  scoreCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    borderColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  scoreValue: { color: '#FFFFFF', fontSize: 48, fontWeight: '900' },
  scoreTier: { color: '#34C759', fontSize: 16, fontWeight: 'bold', letterSpacing: 2 },
  heroSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0A2E5C', margin: Spacing.four },
  benefitsGrid: { flexDirection: 'row', paddingHorizontal: Spacing.four, gap: Spacing.three },
  benefitCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.four,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  benefitIcon: { fontSize: 32, marginBottom: Spacing.two },
  benefitTitle: { fontSize: 16, fontWeight: 'bold', color: '#0A2E5C', marginBottom: 4 },
  benefitDesc: { fontSize: 12, color: '#60646C', textAlign: 'center' },
});
