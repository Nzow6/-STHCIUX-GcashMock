import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Spacing } from '@/constants/theme';
import { SendIcon, GLoanIcon, ShopIcon, QrIcon } from '@/components/vector-icons';

export default function SendHubScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleExpressSend = () => {
    router.push('/express-send');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header bar */}
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.iconPressable, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Send</Text>
        <Pressable style={styles.iconPressable}>
          <View style={styles.infoCircle}>
            <Text style={styles.infoText}>i</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Ad Banner Placeholder */}
        <View style={styles.adBanner}>
          <View style={styles.adBannerContent} />
        </View>

        {/* Section 1: Send to any GCash account */}
        <Text style={styles.sectionHeader}>Send to any GCash account</Text>
        
        {/* Express Send */}
        <Pressable
          onPress={handleExpressSend}
          style={({ pressed }) => [styles.optionCard, pressed && styles.pressed]}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#F0F5FF' }]}>
            <SendIcon color="#007CFF" size={24} />
          </View>
          <View style={styles.optionDetails}>
            <Text style={styles.optionTitle}>Express Send</Text>
            <Text style={styles.optionSubtitle}>Send GCash quickly</Text>
          </View>
        </Pressable>

        {/* GLoan Card */}
        <View style={styles.promoCard}>
          <View style={[styles.iconContainer, { backgroundColor: '#FFF0E6' }]}>
            <GLoanIcon color="#FF7A00" size={24} />
          </View>
          <View style={styles.optionDetails}>
            <Text style={[styles.optionTitle, { color: '#8F3F00' }]}>Instant cash loan up to 125K</Text>
            <Text style={styles.promoLink}>Go to GLoan</Text>
          </View>
        </View>

        {/* Section 2: Send through our partners */}
        <Text style={styles.sectionHeader}>Send through our partners</Text>
        
        <View style={styles.partnerInfoBlock}>
          <Text style={styles.partnerInfoText}>
            Did you know that GCash has over 2,000+ partners all over the Philippines.{' '}
            <Text style={styles.partnerLink}>See our list of GCash Padala partners</Text>
          </Text>
        </View>

        {/* GCash Padala */}
        <View style={styles.optionCard}>
          <View style={[styles.iconContainer, { backgroundColor: '#F4F6F9' }]}>
            <ShopIcon color="#60646C" size={24} />
          </View>
          <View style={styles.optionDetails}>
            <Text style={styles.optionTitle}>GCash Padala</Text>
            <Text style={styles.optionSubtitle}>Send cash to anyone in the country</Text>
          </View>
        </View>

        {/* Section 3: Request money */}
        <Text style={styles.sectionHeader}>Request money</Text>

        {/* Generate QR */}
        <View style={styles.optionCard}>
          <View style={[styles.iconContainer, { backgroundColor: '#F0F5FF' }]}>
            <QrIcon color="#007CFF" size={24} />
          </View>
          <View style={styles.optionDetails}>
            <Text style={styles.optionTitle}>Generate QR</Text>
            <Text style={styles.optionSubtitle}>Request easily using your QR code</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  headerRow: {
    height: 56,
    backgroundColor: '#007CFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  backArrow: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  iconPressable: {
    padding: Spacing.one,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.six,
  },
  adBanner: {
    marginVertical: Spacing.three,
    height: 90,
    backgroundColor: '#E5E8EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  adBannerContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 8,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  promoCard: {
    backgroundColor: '#FFF5F0',
    borderRadius: 8,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.two,
    borderWidth: 1,
    borderColor: '#FFE0CC',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#60646C',
    marginTop: 2,
  },
  promoLink: {
    fontSize: 12,
    color: '#FF7A00',
    fontWeight: 'bold',
    marginTop: 2,
  },
  partnerInfoBlock: {
    marginBottom: Spacing.two,
  },
  partnerInfoText: {
    fontSize: 12,
    color: '#60646C',
    lineHeight: 16,
  },
  partnerLink: {
    color: '#007CFF',
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.8,
  },
});
