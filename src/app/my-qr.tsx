import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

const qrOptions = [
  {
    key: 'pay',
    title: 'Pay using QR Code',
    description: 'Show any of these codes to the cashier to pay for your purchases.',
  },
  {
    key: 'abroad',
    title: 'Pay abroad with Alipay+',
    description: 'Show this code to the cashier when paying abroad!',
  },
  {
    key: 'receive',
    title: 'Receive money via QR Code',
    description: 'Share this code to anyone so they can send you money through GCash or Bank Transfer.',
  },
  {
    key: 'commute',
    title: 'Commute',
    description: 'Pay for your transportation',
  },
];

export default function MyQRScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>My QR Code</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Heading Text */}
      <Text style={styles.headingText}>
        Generate a QR Code to pay for a purchase or request money.
      </Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {qrOptions.map((option) => (
          <Pressable
            key={option.key}
            onPress={() => router.push({ pathname: '/qr-display', params: { type: option.key } })}
            style={({ pressed }) => [styles.optionCard, pressed && styles.pressed]}
          >
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  header: {
    height: 56,
    backgroundColor: '#005CE6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
  },
  backButton: {
    padding: Spacing.two,
  },
  headingText: {
    fontSize: 23,
    fontWeight: '600',
    color: '#1A1C1E',
    textAlign: 'left',
    lineHeight: 22,
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 60,
  },
  qrPreviewContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.five,
    margin: Spacing.four,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  qrPreview: {
    width: 180,
    height: 180,
  },
  optionsContainer: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.one,
  },
  optionDescription: {
    fontSize: 12,
    color: '#60646C',
    lineHeight: 18,
  },
  chevron: {
    fontSize: 24,
    color: '#8E8E93',
    marginLeft: Spacing.two,
  },
  pressed: {
    opacity: 0.8,
  },
});
