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

const CAROUSEL_ITEMS = [
  { id: '1', title: '50% off at Starbucks', points: '500 pts' },
  { id: '2', title: 'Free Shipping on Shopee', points: '300 pts' },
  { id: '3', title: '₱100 off on Grab', points: '750 pts' },
];

const CATEGORIES = ['Food', 'Shopping', 'Entertainment', 'Travel', 'Health'];

const VOUCHERS = [
  { id: '1', brand: 'Starbucks', offer: '50% off any handcrafted beverage', points: 500 },
  { id: '2', brand: 'Shopee', offer: 'Free shipping voucher', points: 300 },
  { id: '3', brand: 'Jollibee', offer: 'Buy 1 Get 1 Chickenjoy', points: 450 },
  { id: '4', brand: 'Netflix', offer: '1 month standard plan', points: 1200 },
];

export default function ARewardsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScreenHeader title="A+ Rewards" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Points Display */}
          <View style={styles.pointsBanner}>
            <Text style={styles.pointsLabel}>Available Points</Text>
            <Text style={styles.pointsValue}>1,250</Text>
          </View>

          {/* Promo Carousel */}
          <Text style={styles.sectionTitle}>Featured Rewards</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselScroll}
          >
            {CAROUSEL_ITEMS.map((item) => (
              <View key={item.id} style={styles.carouselCard}>
                <Text style={styles.carouselTitle}>{item.title}</Text>
                <Text style={styles.carouselPoints}>{item.points}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Categories */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={({ pressed }) => [styles.categoryButton, pressed && styles.pressed]}
              >
                <Text style={styles.categoryButtonText}>{category}</Text>
              </Pressable>
            ))}
          </View>

          {/* Voucher Grid */}
          <Text style={styles.sectionTitle}>Vouchers</Text>
          <FlatList
            data={VOUCHERS}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.voucherCard}>
                <View style={styles.voucherInfo}>
                  <Text style={styles.voucherBrand}>{item.brand}</Text>
                  <Text style={styles.voucherOffer}>{item.offer}</Text>
                  <Text style={styles.voucherPoints}>{item.points} pts</Text>
                </View>
                <Pressable style={({ pressed }) => [styles.claimButton, pressed && styles.pressed]}>
                  <Text style={styles.claimButtonText}>Claim</Text>
                </Pressable>
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
  pointsBanner: {
    backgroundColor: '#007CFF',
    borderRadius: 16,
    padding: Spacing.four,
    marginBottom: Spacing.three,
    alignItems: 'center',
  },
  pointsLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  pointsValue: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: Spacing.one,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  carouselScroll: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  carouselCard: {
    width: 260,
    height: 120,
    backgroundColor: '#0A2E5C',
    borderRadius: 16,
    padding: Spacing.three,
    justifyContent: 'space-between',
  },
  carouselTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  carouselPoints: {
    color: '#54A0FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  categoryButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  voucherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.three,
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  voucherInfo: {
    flex: 1,
  },
  voucherBrand: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  voucherOffer: {
    fontSize: 12,
    color: '#60646C',
    marginTop: 2,
  },
  voucherPoints: {
    fontSize: 12,
    color: '#007CFF',
    fontWeight: 'bold',
    marginTop: Spacing.one,
  },
  claimButton: {
    backgroundColor: '#007CFF',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 8,
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
