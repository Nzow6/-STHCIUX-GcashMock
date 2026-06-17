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

const RIDE_HISTORY = [
  { id: '1', route: 'MRT Station', fare: '₱20.00', date: 'Jun 14, 2026' },
  { id: '2', route: 'City Bus', fare: '₱15.00', date: 'Jun 12, 2026' },
  { id: '3', route: 'LRT Station', fare: '₱18.00', date: 'Jun 10, 2026' },
  { id: '4', route: 'City Bus', fare: '₱15.00', date: 'Jun 8, 2026' },
];

export default function CommuteScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScreenHeader title="Commute" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Payment QR */}
          <View style={styles.qrSection}>
            <Text style={styles.qrLabel}>Scan at turnstile or bus</Text>
            <View style={styles.qrPlaceholder}>
              <View style={styles.qrPattern}>
                <Text style={styles.qrIcon}>▣</Text>
              </View>
            </View>
            <Text style={styles.qrHint}>Show this QR to the scanner</Text>
          </View>

          {/* Linked Transport Card */}
          <View style={styles.transportCard}>
            <View style={styles.transportCardLeft}>
              <Text style={styles.transportIcon}>🚇</Text>
              <View>
                <Text style={styles.transportName}>Beep Card</Text>
                <Text style={styles.transportNumber}>•••• 8842</Text>
              </View>
            </View>
            <View style={styles.transportBalanceCol}>
              <Text style={styles.transportBalanceLabel}>Balance</Text>
              <Text style={styles.transportBalance}>₱250.00</Text>
            </View>
            <Pressable style={({ pressed }) => [styles.reloadButton, pressed && styles.pressed]}>
              <Text style={styles.reloadButtonText}>Reload</Text>
            </Pressable>
          </View>

          {/* Ride History */}
          <Text style={styles.sectionTitle}>Ride History</Text>
          <FlatList
            data={RIDE_HISTORY}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.historyRow}>
                <View style={styles.historyLeft}>
                  <Text style={styles.historyRoute}>{item.route}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <Text style={styles.historyFare}>{item.fare}</Text>
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
  qrSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.four,
    alignItems: 'center',
    marginBottom: Spacing.three,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  qrLabel: {
    fontSize: 14,
    color: '#60646C',
    marginBottom: Spacing.two,
  },
  qrPlaceholder: {
    width: 220,
    height: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 8,
    borderColor: '#0A2E5C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrPattern: {
    width: 160,
    height: 160,
    backgroundColor: '#0A2E5C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrIcon: {
    fontSize: 80,
    color: '#FFFFFF',
  },
  qrHint: {
    fontSize: 12,
    color: '#60646C',
    marginTop: Spacing.two,
  },
  transportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.four,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    justifyContent: 'space-between',
  },
  transportCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  transportIcon: {
    fontSize: 28,
  },
  transportName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  transportNumber: {
    fontSize: 12,
    color: '#60646C',
  },
  transportBalanceCol: {
    alignItems: 'flex-end',
  },
  transportBalanceLabel: {
    fontSize: 10,
    color: '#60646C',
  },
  transportBalance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  reloadButton: {
    backgroundColor: '#007CFF',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 8,
  },
  reloadButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    borderRadius: 12,
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  historyLeft: {
    flex: 1,
  },
  historyRoute: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  historyDate: {
    fontSize: 12,
    color: '#60646C',
    marginTop: 2,
  },
  historyFare: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  pressed: {
    opacity: 0.8,
  },
});
