import React from 'react';
import {
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

const CATEGORIES = [
  { name: 'Health', icon: '🏥' },
  { name: 'Vehicle', icon: '🚗' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Pet', icon: '🐾' },
];

export default function GInsureScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScreenHeader title="GInsure" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Active Policies */}
          <View style={styles.policyCard}>
            <View style={styles.policyHeader}>
              <Text style={styles.policyTitle}>Active Policies</Text>
              <Text style={styles.policyCount}>1</Text>
            </View>
            <Pressable style={({ pressed }) => [styles.policyLink, pressed && styles.pressed]}>
              <Text style={styles.policyLinkText}>View details {'>'}</Text>
            </Pressable>
          </View>

          {/* Marketplace Categories */}
          <Text style={styles.sectionTitle}>Insurance Marketplace</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category.name}
                style={({ pressed }) => [styles.categoryCard, pressed && styles.pressed]}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </Pressable>
            ))}
          </View>

          {/* Featured Product */}
          <Text style={styles.sectionTitle}>Featured</Text>
          <View style={styles.featuredBanner}>
            <Text style={styles.featuredBadge}>Best Seller</Text>
            <Text style={styles.featuredTitle}>Dengue Coverage</Text>
            <Text style={styles.featuredDesc}>
              Get protection against dengue for only ₱300/year with coverage up to ₱50,000.
            </Text>
            <Pressable style={({ pressed }) => [styles.featuredButton, pressed && styles.pressed]}>
              <Text style={styles.featuredButtonText}>Learn More</Text>
            </Pressable>
          </View>
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
  policyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.four,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  policyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  policyCount: {
    backgroundColor: '#007CFF',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  policyLink: {
    padding: Spacing.one,
  },
  policyLinkText: {
    color: '#007CFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: Spacing.one,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  featuredBanner: {
    backgroundColor: '#0A2E5C',
    borderRadius: 16,
    padding: Spacing.four,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF3B30',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: Spacing.two,
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  featuredDesc: {
    color: '#E0E5EC',
    fontSize: 14,
    marginBottom: Spacing.three,
    lineHeight: 20,
  },
  featuredButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  featuredButtonText: {
    color: '#007CFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
