import React, { useState } from 'react';
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

const TABS = ['Flights', 'Hotels', 'Buses'];

const TRAVEL_DEALS = [
  { id: '1', title: 'Boracay Getaways', subtitle: 'Beach packages from ₱3,999' },
  { id: '2', title: 'Tokyo Flights', subtitle: 'Discounted flights to Tokyo' },
  { id: '3', title: 'Cebu Staycations', subtitle: 'Hotels up to 40% off' },
];

export default function TravelScreen() {
  const [activeTab, setActiveTab] = useState('Flights');

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScreenHeader title="Travel" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Booking Tabs */}
          <View style={styles.tabContainer}>
            {TABS.map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton,
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === tab && styles.activeTabButtonText,
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Search Form */}
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Origin</Text>
              <TextInput
                style={styles.input}
                placeholder="From where?"
                placeholderTextColor="#8E8E93"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Destination</Text>
              <TextInput
                style={styles.input}
                placeholder="To where?"
                placeholderTextColor="#8E8E93"
              />
            </View>
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Departure</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Date"
                  placeholderTextColor="#8E8E93"
                />
              </View>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Passengers</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Pressable style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}>
              <Text style={styles.searchButtonText}>Search Options</Text>
            </Pressable>
          </View>

          {/* Travel Deals */}
          <Text style={styles.sectionTitle}>Travel Deals</Text>
          <FlatList
            data={TRAVEL_DEALS}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.dealCard}>
                <View style={styles.dealImagePlaceholder}>
                  <Text style={styles.dealImageText}>✈️</Text>
                </View>
                <View style={styles.dealInfo}>
                  <Text style={styles.dealTitle}>{item.title}</Text>
                  <Text style={styles.dealSubtitle}>{item.subtitle}</Text>
                </View>
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.three,
    gap: Spacing.two,
  },
  tabButton: {
    flex: 1,
    paddingVertical: Spacing.two,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E1E6',
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#007CFF',
    borderColor: '#007CFF',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  activeTabButtonText: {
    color: '#FFFFFF',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.four,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  inputGroup: {
    marginBottom: Spacing.two,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  halfInput: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#60646C',
    marginBottom: Spacing.one,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F4F6F9',
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 14,
    color: '#0A2E5C',
  },
  searchButton: {
    backgroundColor: '#007CFF',
    paddingVertical: Spacing.three,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  searchButtonText: {
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
  dealCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    alignItems: 'center',
  },
  dealImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  dealImageText: {
    fontSize: 28,
  },
  dealInfo: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  dealSubtitle: {
    fontSize: 12,
    color: '#60646C',
    marginTop: 2,
  },
  pressed: {
    opacity: 0.8,
  },
});
