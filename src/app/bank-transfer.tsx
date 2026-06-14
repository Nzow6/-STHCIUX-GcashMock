import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Spacing } from '@/constants/theme';

export default function BankTransferScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleLocal = () => {
    router.push('/bank-select');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header Bar */}
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.iconPressable, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Bank Transfer</Text>
        <Pressable style={styles.iconPressable} onPress={() => Alert.alert('Bank Transfer Info', 'Transfer money locally and internationally.')}>
          <View style={styles.infoCircle}>
            <Text style={styles.infoText}>i</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Ad Banner: Fidoph Philippines-Cash Loan */}
        <View style={styles.adBanner}>
          <View style={styles.adIconContainer}>
            <View style={styles.fidoBadge}>
              <Text style={styles.fidoBadgeText}>Fido</Text>
            </View>
          </View>
          <View style={styles.adTextContainer}>
            <Text style={styles.adTitle} numberOfLines={1}>Fidoph Philippines-Cash Loan</Text>
            <Text style={styles.adSubtitle} numberOfLines={1}>low interest loans...</Text>
          </View>
          <Pressable style={styles.getButton} onPress={() => Alert.alert('Promo', 'Opening Fidoph Cash Loan application...')}>
            <Text style={styles.getButtonText}>Get</Text>
          </Pressable>
        </View>

        {/* Section Heading */}
        <Text style={styles.sectionHeading}>Bank transfer locally and internationally</Text>

        {/* Service Options Cards */}
        {/* Local Transfer */}
        <Pressable
          onPress={handleLocal}
          style={({ pressed }) => [styles.optionCard, pressed && styles.pressed]}
        >
          {/* Custom vector Local Bank Icon */}
          <View style={styles.bankIconContainer}>
            <View style={styles.bankRoof} />
            <View style={styles.bankPillarsRow}>
              <View style={styles.bankPillar} />
              <View style={styles.bankPillar} />
              <View style={styles.bankPillar} />
            </View>
            <View style={styles.bankBase} />
            <View style={styles.pesoSymbolBadge}>
              <Text style={styles.pesoSymbolText}>₱</Text>
            </View>
          </View>

          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Local</Text>
            <Text style={styles.cardSubtitle}>Transfer money to a local bank account.</Text>
          </View>
        </Pressable>

        {/* International Transfer */}
        <Pressable
          onPress={() => Alert.alert('International Transfer', 'International bank transfers are currently unavailable in this usability test.')}
          style={({ pressed }) => [styles.optionCard, pressed && styles.pressed]}
        >
          {/* Custom vector International Bank Icon */}
          <View style={styles.bankIconContainer}>
            <View style={styles.bankRoof} />
            <View style={styles.bankPillarsRow}>
              <View style={styles.bankPillar} />
              <View style={styles.bankPillar} />
              <View style={styles.bankPillar} />
            </View>
            <View style={styles.bankBase} />
            {/* Globe Badge */}
            <View style={styles.globeBadge}>
              <View style={styles.globeInner} />
            </View>
          </View>

          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>International</Text>
            <Text style={styles.cardSubtitle}>Transfer money to international bank accounts and e-wallets.</Text>
          </View>
        </Pressable>
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
    backgroundColor: '#005CE6',
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
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
  },
  adBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    padding: Spacing.three,
    alignItems: 'center',
    marginBottom: Spacing.five,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  adIconContainer: {
    marginRight: Spacing.three,
  },
  fidoBadge: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFEE00',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0C200',
  },
  fidoBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  adTextContainer: {
    flex: 1,
    marginRight: Spacing.two,
  },
  adTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  adSubtitle: {
    fontSize: 12,
    color: '#60646C',
    marginTop: 2,
  },
  getButton: {
    backgroundColor: '#007CFF',
    borderRadius: 16,
    paddingHorizontal: Spacing.four,
    paddingVertical: 6,
  },
  getButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002E5C',
    marginBottom: Spacing.four,
    lineHeight: 24,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    padding: Spacing.four,
    alignItems: 'center',
    marginBottom: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  bankIconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.four,
    position: 'relative',
  },
  bankRoof: {
    width: 32,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#005CE6',
  },
  bankPillarsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 26,
    height: 12,
    marginTop: 1,
  },
  bankPillar: {
    width: 4,
    height: 12,
    backgroundColor: '#005CE6',
  },
  bankBase: {
    width: 32,
    height: 4,
    backgroundColor: '#005CE6',
    borderRadius: 1,
  },
  pesoSymbolBadge: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#005CE6',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pesoSymbolText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  globeBadge: {
    position: 'absolute',
    bottom: 2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#005CE6',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  globeInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002E5C',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#60646C',
    marginTop: 4,
    lineHeight: 16,
  },
  pressed: {
    opacity: 0.8,
  },
});
