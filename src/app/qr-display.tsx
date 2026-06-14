import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

const typeLabels: Record<string, string> = {
  pay: 'Pay using QR Code',
  abroad: 'Pay abroad with Alipay+',
  receive: 'Receive money via QR Code',
  commute: 'Commute',
};

const typeDescriptions: Record<string, string> = {
  pay: 'Show this code to the cashier to pay for your purchases.',
  abroad: 'Show this code to the cashier when paying abroad!',
  receive: 'Share this code to anyone so they can send you money through GCash or Bank Transfer.',
  commute: 'Show this code to pay for your transportation.',
};

export default function QRDisplayScreen() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const label = type ? typeLabels[type] ?? 'My QR Code' : 'My QR Code';
  const description = type ? typeDescriptions[type] ?? '' : '';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{label}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/myQR.png')}
            style={styles.qrImage}
            resizeMode="contain"
          />
          <Text style={styles.description}>{description}</Text>
        </View>
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
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.five,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  qrImage: {
    width: 220,
    height: 220,
    marginBottom: Spacing.four,
  },
  description: {
    fontSize: 14,
    color: '#60646C',
    textAlign: 'center',
    lineHeight: 20,
  },
});
