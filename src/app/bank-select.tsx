import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Spacing } from '@/constants/theme';

interface BankItem {
  id: string;
  name: string;
  logoColor: string;
  logoLetters: string;
}

export default function BankSelectScreen() {
  const [search, setSearch] = useState('');

  const handleBack = () => {
    router.back();
  };

  // List of partner banks based on screenshot
  const partnerBanks: BankItem[] = [
    { id: 'bdo', name: 'BDO Unibank, Inc.', logoColor: '#002E5C', logoLetters: 'BDO' },
    { id: 'pnb', name: 'Philippine National Bank (PNB)', logoColor: '#005CE6', logoLetters: 'PNB' },
    { id: 'china', name: 'China Banking Corporation', logoColor: '#D32F2F', logoLetters: 'CBC' },
    { id: 'eastwest', name: 'East West Banking Corporation', logoColor: '#4A148C', logoLetters: 'EWB' },
    { id: 'rcbc', name: 'RCBC/DiskarTech', logoColor: '#0288D1', logoLetters: 'RCBC' },
  ];

  const filteredBanks = partnerBanks.filter((bank) =>
    bank.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBankPress = (bankId: string) => {
    if (bankId === 'bdo') {
      router.push('/bank-pay');
    } else {
      Alert.alert('Usability Test Notification', 'Please select BDO Unibank, Inc. to complete the test task.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header Bar */}
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.iconPressable, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Bank Transfer</Text>
        <Pressable style={styles.iconPressable} onPress={() => Alert.alert('Bank Selection Help', 'Search or tap a partner bank to initiate a transfer.')}>
          <View style={styles.infoCircle}>
            <Text style={styles.infoText}>i</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Ad Banner: Tekcash-Secure Online Loan */}
        <View style={styles.adBanner}>
          <View style={styles.adIconContainer}>
            <View style={styles.tekBadge}>
              <Text style={styles.tekBadgeText}>t</Text>
            </View>
          </View>
          <View style={styles.adTextContainer}>
            <Text style={styles.adTitle} numberOfLines={1}>Tekcash-Secure Online Loan</Text>
            <Text style={styles.adSubtitle} numberOfLines={1}>Loan Amounts Up to...</Text>
          </View>
          <Pressable style={styles.getButton} onPress={() => Alert.alert('Promo', 'Opening Tekcash Secure Online Loan application...')}>
            <Text style={styles.getButtonText}>Get</Text>
          </Pressable>
        </View>

        {/* Mock Search Bar */}
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#B0B4BA"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* My Saved Bank Accounts Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeaderTitle}>My Saved Bank Accounts</Text>
          <Text style={styles.chevronIcon}>▼</Text>
        </View>

        <View style={styles.savedAccountsRow}>
          {/* Add Account */}
          <Pressable style={styles.savedAccountItem} onPress={() => Alert.alert('Add Account', 'Feature not supported in usability test.')}>
            <View style={styles.addAccountCircle}>
              <Text style={styles.addPlusText}>+</Text>
            </View>
            <Text style={styles.savedAccountLabel} numberOfLines={2}>Add Account</Text>
          </Pressable>

          {/* karl maya */}
          <Pressable style={styles.savedAccountItem} onPress={() => Alert.alert('Karl Maya', 'Initiating transfer to Karl Maya...')}>
            <View style={styles.mayaCircle}>
              <Text style={styles.mayaCircleText}>maya</Text>
            </View>
            <Text style={styles.savedAccountLabel} numberOfLines={2}>karl maya</Text>
          </Pressable>
        </View>

        {/* Partner Banks Section */}
        <Text style={styles.sectionHeaderTitleNoToggle}>Partner Banks</Text>

        {/* Scan/Upload Bank QR Option */}
        <Pressable
          onPress={() => Alert.alert('Bank QR Scanner', 'Scanning bank QR codes is not configured for this test.')}
          style={({ pressed }) => [styles.qrCard, pressed && styles.pressed]}
        >
          <View style={styles.qrIconBorder}>
            <Text style={styles.qrInnerIcon}>⤒</Text>
          </View>
          <View style={styles.qrCardTextContainer}>
            <Text style={styles.qrCardTitle}>Scan/Upload Bank QR</Text>
            <Text style={styles.qrCardSubtitle}>Bank transfer by scanning or uploading a QR code.</Text>
          </View>
        </Pressable>

        {/* Bank Options List */}
        <View style={styles.bankListContainer}>
          {filteredBanks.map((bank) => (
            <Pressable
              key={bank.id}
              onPress={() => handleBankPress(bank.id)}
              style={({ pressed }) => [styles.bankListItem, pressed && styles.pressed]}
            >
              {/* Fake bank logo representation */}
              <View style={[styles.bankLogoCircle, { backgroundColor: bank.logoColor }]}>
                <Text style={styles.bankLogoLetters}>{bank.logoLetters}</Text>
              </View>

              <Text style={styles.bankNameText} numberOfLines={1}>{bank.name}</Text>
              <Text style={styles.arrowChevron}>➔</Text>
            </Pressable>
          ))}

          {filteredBanks.length === 0 && (
            <Text style={styles.emptySearchText}>No banks found matching "{search}"</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Clean white back panel matching bank select page
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
    marginBottom: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  adIconContainer: {
    marginRight: Spacing.three,
  },
  tekBadge: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#005CE6',
  },
  tekBadgeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#005CE6',
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
    fontSize: 11,
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
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F6F9',
    borderRadius: 24,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    height: 40,
    marginBottom: Spacing.four,
  },
  searchIcon: {
    fontSize: 14,
    color: '#60646C',
    marginRight: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    height: '100%',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.two,
    marginBottom: Spacing.three,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#002E5C',
  },
  sectionHeaderTitleNoToggle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#002E5C',
    marginTop: Spacing.four,
    marginBottom: Spacing.three,
  },
  chevronIcon: {
    fontSize: 12,
    color: '#005CE6',
  },
  savedAccountsRow: {
    flexDirection: 'row',
    gap: Spacing.five,
    paddingLeft: Spacing.one,
    marginBottom: Spacing.three,
  },
  savedAccountItem: {
    alignItems: 'center',
    width: 65,
  },
  addAccountCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: '#007CFF',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  addPlusText: {
    color: '#007CFF',
    fontSize: 22,
    fontWeight: '300',
  },
  mayaCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E1E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  mayaCircleText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#00FF66',
    backgroundColor: '#003311',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  savedAccountLabel: {
    fontSize: 11,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 14,
  },
  qrCard: {
    flexDirection: 'row',
    backgroundColor: '#F0F5FF',
    borderRadius: 12,
    padding: Spacing.four,
    alignItems: 'center',
    marginBottom: Spacing.four,
    borderWidth: 1,
    borderColor: '#D0E2FF',
  },
  qrIconBorder: {
    width: 38,
    height: 38,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#007CFF',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.four,
  },
  qrInnerIcon: {
    fontSize: 22,
    color: '#007CFF',
    fontWeight: 'bold',
  },
  qrCardTextContainer: {
    flex: 1,
  },
  qrCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#002E5C',
  },
  qrCardSubtitle: {
    fontSize: 11,
    color: '#60646C',
    marginTop: 2,
    lineHeight: 14,
  },
  bankListContainer: {
    width: '100%',
  },
  bankListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F6F9',
  },
  bankLogoCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.four,
  },
  bankLogoLetters: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bankNameText: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  arrowChevron: {
    fontSize: 14,
    color: '#007CFF',
  },
  emptySearchText: {
    textAlign: 'center',
    color: '#B0B4BA',
    marginTop: Spacing.four,
    fontSize: 13,
  },
  pressed: {
    opacity: 0.8,
  },
});
