import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/screen-header';
import { Spacing } from '@/constants/theme';

export default function PromosScreen() {
  const PROMOS = [
    { id: '1', title: 'Win a Trip to Boracay!', desc: 'Use GCash to pay at any partner merchant.', emoji: '🏖️', color: '#00D1FF' },
    { id: '2', title: '10% Cashback on Bills', desc: 'Pay 3 bills this month to qualify.', emoji: '💡', color: '#FFB800' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScreenHeader title="Promos" />
      <ScrollView contentContainerStyle={styles.content}>
        {PROMOS.map(promo => (
          <View key={promo.id} style={[styles.promoCard, { backgroundColor: promo.color }]}>
            <View style={styles.promoDetails}>
              <Text style={styles.promoEmoji}>{promo.emoji}</Text>
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoDesc}>{promo.desc}</Text>
              <Pressable style={styles.joinBtn}>
                <Text style={styles.joinBtnText}>Join Promo</Text>
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
  content: { padding: Spacing.four, gap: Spacing.four },
  promoCard: {
    borderRadius: 20,
    padding: Spacing.five,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  promoDetails: { alignItems: 'flex-start' },
  promoEmoji: { fontSize: 40, marginBottom: Spacing.two },
  promoTitle: { fontSize: 20, fontWeight: '900', color: '#FFFFFF', marginBottom: Spacing.one },
  promoDesc: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: Spacing.four },
  joinBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: Spacing.four, paddingVertical: Spacing.two, borderRadius: 24 },
  joinBtnText: { color: '#0A2E5C', fontWeight: 'bold', fontSize: 14 },
});
