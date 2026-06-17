import React, { useState } from 'react';
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

const LINKED_CARDS = [
  { id: '1', type: 'Mastercard', last4: '4242', expiry: '12/28' },
  { id: '2', type: 'Visa', last4: '8888', expiry: '09/27' },
];

export default function CardsScreen() {
  const [cvvVisible, setCvvVisible] = useState(false);
  const [cardLocked, setCardLocked] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScreenHeader title="My Cards" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Virtual Card Display */}
          <View style={styles.cardGraphic}>
            <View style={styles.cardTopRow}>
              <Text style={styles.cardChip}>💳</Text>
              <Text style={styles.cardBrand}>GCash Card</Text>
            </View>
            <Text style={styles.cardNumber}>4242 8888 1234 5678</Text>
            <View style={styles.cardBottomRow}>
              <View>
                <Text style={styles.cardLabel}>Card Holder</Text>
                <Text style={styles.cardValue}>JUAN DELA CRUZ</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>Expires</Text>
                <Text style={styles.cardValue}>12/28</Text>
              </View>
            </View>
          </View>

          {/* Card Controls */}
          <View style={styles.controlsRow}>
            <Pressable
              onPress={() => setCardLocked(!cardLocked)}
              style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}
            >
              <Text style={styles.controlIcon}>{cardLocked ? '🔓' : '🔒'}</Text>
              <Text style={styles.controlLabel}>{cardLocked ? 'Unlock' : 'Lock Card'}</Text>
            </Pressable>
            <Pressable
              onPress={() => setCvvVisible(!cvvVisible)}
              style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}
            >
              <Text style={styles.controlIcon}>👁</Text>
              <Text style={styles.controlLabel}>Show CVV</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [styles.controlButton, pressed && styles.pressed]}>
              <Text style={styles.controlIcon}>⚙</Text>
              <Text style={styles.controlLabel}>Set Limits</Text>
            </Pressable>
          </View>
          {cvvVisible && (
            <View style={styles.cvvBanner}>
              <Text style={styles.cvvText}>CVV: 123</Text>
            </View>
          )}

          {/* Linked Cards List */}
          <Text style={styles.sectionTitle}>Linked Payment Methods</Text>
          <FlatList
            data={LINKED_CARDS}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.linkedCardRow}>
                <Text style={styles.linkedCardIcon}>💳</Text>
                <View style={styles.linkedCardInfo}>
                  <Text style={styles.linkedCardType}>{item.type}</Text>
                  <Text style={styles.linkedCardDetail}>•••• {item.last4} | Exp {item.expiry}</Text>
                </View>
              </View>
            )}
          />

          {/* Add Card Button */}
          <Pressable style={({ pressed }) => [styles.addCardButton, pressed && styles.pressed]}>
            <Text style={styles.addCardIcon}>+</Text>
            <Text style={styles.addCardText}>Link a New Card</Text>
          </Pressable>
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
  cardGraphic: {
    backgroundColor: '#0A2E5C',
    borderRadius: 16,
    padding: Spacing.four,
    marginBottom: Spacing.three,
    height: 200,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardChip: {
    fontSize: 28,
  },
  cardBrand: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    letterSpacing: 2,
    fontWeight: '600',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    marginBottom: 2,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.three,
  },
  controlButton: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  controlIcon: {
    fontSize: 22,
  },
  controlLabel: {
    fontSize: 12,
    color: '#0A2E5C',
    fontWeight: '600',
  },
  cvvBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: Spacing.two,
    alignItems: 'center',
    marginBottom: Spacing.three,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  cvvText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    letterSpacing: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  linkedCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    borderRadius: 12,
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  linkedCardIcon: {
    fontSize: 24,
    marginRight: Spacing.three,
  },
  linkedCardInfo: {
    flex: 1,
  },
  linkedCardType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  linkedCardDetail: {
    fontSize: 12,
    color: '#60646C',
    marginTop: 2,
  },
  addCardButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#007CFF',
    borderRadius: 12,
    padding: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  addCardIcon: {
    fontSize: 20,
    color: '#007CFF',
    fontWeight: 'bold',
  },
  addCardText: {
    color: '#007CFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
