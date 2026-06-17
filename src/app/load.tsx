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
import { useTheme } from '@/hooks/use-theme';

const NETWORKS = ['Globe', 'Smart', 'DITO'];

const PROMOS = [
  { id: '1', name: 'Surf50', description: '5GB for 3 Days', price: '₱50' },
  { id: '2', name: 'Regular 100', description: '₱100 Load', price: '₱100' },
  { id: '3', name: 'All-Net 199', description: 'Unli texts & calls', price: '₱199' },
  { id: '4', name: 'Giga Video 299', description: '10GB + Video', price: '₱299' },
  { id: '5', name: 'All-Net 599', description: 'Unli all-net calls', price: '₱599' },
  { id: '6', name: 'Giga Stories 99', description: '2GB Stories', price: '₱99' },
];

export default function LoadScreen() {
  const theme = useTheme();
  const [activeNetwork, setActiveNetwork] = useState('Globe');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScreenHeader title="Buy Load" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Mobile Number Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <View style={styles.inputRow}>
              <Text style={styles.countryCode}>+63</Text>
              <TextInput
                style={styles.input}
                placeholder="9XX XXX XXXX"
                placeholderTextColor="#8E8E93"
                keyboardType="phone-pad"
                maxLength={10}
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />
              <Pressable style={styles.contactButton}>
                <Text style={styles.contactIcon}>👤</Text>
              </Pressable>
            </View>
          </View>

          {/* Network Tabs */}
          <View style={styles.tabContainer}>
            {NETWORKS.map((network) => (
              <Pressable
                key={network}
                onPress={() => setActiveNetwork(network)}
                style={[
                  styles.tabButton,
                  activeNetwork === network && styles.activeTabButton,
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeNetwork === network && styles.activeTabButtonText,
                  ]}
                >
                  {network}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Promo Grid */}
          <Text style={styles.sectionTitle}>Load Promos</Text>
          <FlatList
            data={PROMOS}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setSelectedPromo(item.id)}
                style={[
                  styles.promoCard,
                  selectedPromo === item.id && styles.selectedPromoCard,
                  { backgroundColor: theme.background },
                ]}
              >
                <Text style={styles.promoName}>{item.name}</Text>
                <Text style={styles.promoDescription}>{item.description}</Text>
                <Text style={styles.promoPrice}>{item.price}</Text>
              </Pressable>
            )}
          />
        </ScrollView>

        {/* Sticky Bottom Button */}
        <View style={styles.bottomBar}>
          <Pressable
            style={({ pressed }) => [
              styles.nextButton,
              pressed && styles.pressed,
              !selectedPromo && styles.disabledButton,
            ]}
            disabled={!selectedPromo}
          >
            <Text style={styles.nextButtonText}>Buy Load</Text>
          </Pressable>
        </View>
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
    paddingBottom: 100,
  },
  inputSection: {
    marginBottom: Spacing.three,
  },
  inputLabel: {
    fontSize: 12,
    color: '#60646C',
    marginBottom: Spacing.one,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginRight: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#0A2E5C',
    letterSpacing: 1,
  },
  contactButton: {
    padding: Spacing.one,
  },
  contactIcon: {
    fontSize: 20,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  promoCard: {
    flex: 1,
    margin: Spacing.one,
    padding: Spacing.three,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    minHeight: 100,
    justifyContent: 'space-between',
  },
  selectedPromoCard: {
    borderColor: '#007CFF',
    backgroundColor: '#F0F5FF',
  },
  promoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  promoDescription: {
    fontSize: 12,
    color: '#60646C',
    marginTop: Spacing.one,
  },
  promoPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007CFF',
    marginTop: Spacing.two,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.three,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E1E6',
  },
  nextButton: {
    backgroundColor: '#007CFF',
    paddingVertical: Spacing.three,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B0B4BA',
  },
  pressed: {
    opacity: 0.8,
  },
});
