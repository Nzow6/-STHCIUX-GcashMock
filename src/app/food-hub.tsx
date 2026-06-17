import React from 'react';
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

const QUICK_FILTERS = ['Fast Food', 'Milk Tea', 'Healthy', 'Dessert'];

const RESTAURANTS = [
  { id: '1', name: 'Jollibee', rating: 4.5, time: '25-35 min', cuisine: 'Fast Food' },
  { id: '2', name: 'Milk Tea House', rating: 4.8, time: '15-25 min', cuisine: 'Milk Tea' },
  { id: '3', name: 'Salad Stop', rating: 4.3, time: '30-45 min', cuisine: 'Healthy' },
  { id: '4', name: 'Gelato Lab', rating: 4.7, time: '20-30 min', cuisine: 'Dessert' },
  { id: '5', name: 'Burger King', rating: 4.2, time: '25-40 min', cuisine: 'Fast Food' },
];

export default function FoodHubScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScreenHeader title="Food Hub" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="What are you craving?"
              placeholderTextColor="#8E8E93"
            />
          </View>

          {/* Quick Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {QUICK_FILTERS.map((filter) => (
              <Pressable
                key={filter}
                style={({ pressed }) => [styles.filterPill, pressed && styles.pressed]}
              >
                <Text style={styles.filterPillText}>{filter}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Restaurant List */}
          <Text style={styles.sectionTitle}>Restaurants Near You</Text>
          <FlatList
            data={RESTAURANTS}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={({ pressed }) => [styles.restaurantCard, pressed && styles.pressed]}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>🍽</Text>
                </View>
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{item.name}</Text>
                  <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
                  <View style={styles.restaurantMeta}>
                    <Text style={styles.rating}>⭐ {item.rating}</Text>
                    <Text style={styles.deliveryTime}>{item.time}</Text>
                  </View>
                </View>
              </Pressable>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    marginBottom: Spacing.three,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0A2E5C',
  },
  filterScroll: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  filterPill: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  imagePlaceholderText: {
    fontSize: 28,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  restaurantCuisine: {
    fontSize: 12,
    color: '#60646C',
    marginTop: 2,
  },
  restaurantMeta: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginTop: Spacing.two,
  },
  rating: {
    fontSize: 12,
    color: '#0A2E5C',
    fontWeight: 'bold',
  },
  deliveryTime: {
    fontSize: 12,
    color: '#007CFF',
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
