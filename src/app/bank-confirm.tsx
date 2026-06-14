import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Spacing } from '@/constants/theme';
import { globalState, useGlobalState } from '@/constants/state';

export default function BankConfirmScreen() {
  const { balance } = useGlobalState();
  const { bank, amount, accountName, accountNumber, email } = useLocalSearchParams<{
    bank: string;
    amount: string;
    accountName: string;
    accountNumber: string;
    email: string;
  }>();

  const parsedAmount = parseFloat(amount || '0');
  const serviceFee = 15.00;
  const totalDeduction = parsedAmount + serviceFee;

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = () => {
    if (parsedAmount > 0 && totalDeduction <= balance) {
      // Deduct balance including fee
      globalState.setBalance(balance - totalDeduction);

      // Add to transaction history
      globalState.addTransaction({
        title: 'Bank Transfer',
        subtitle: `To BDO (${accountName})`,
        amount: -totalDeduction,
        type: 'transfer',
      });

      // Add to inbox notifications
      globalState.addNotification({
        title: 'Bank Transfer Successful',
        body: `Sent PHP ${parsedAmount.toFixed(2)} to BDO account ending in ${accountNumber?.slice(-4)}. Transaction fee PHP 15.00.`,
        type: 'transaction',
      });

      // Route to success screen
      router.push({
        pathname: '/bank-success',
        params: {
          bank,
          amount,
          accountName,
          accountNumber,
          email,
        },
      });
    }
  };

  // Format account number for security: e.g. **** **** 1234
  const formatAccountNumberObscured = (num: string | undefined) => {
    if (!num) return '';
    if (num.length < 4) return num;
    return `**** **** ${num.slice(-4)}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header Bar */}
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.iconPressable, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Bank Transfer</Text>
        <View style={styles.emptyHeaderIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile/Bank Badge Overlay */}
        <View style={styles.bankBadgeContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>🏦</Text>
          </View>
          <Text style={styles.bankTitle}>{bank || 'BDO Unibank, Inc.'}</Text>
          <Text style={styles.accountNumberText}>{formatAccountNumberObscured(accountNumber)}</Text>
        </View>

        {/* Confirmation Details Card */}
        <View style={styles.card}>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Account Name</Text>
            <Text style={styles.dataValueBold}>{accountName}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.aboutToSendText}>You're about to send</Text>

          {/* Amount breakdown */}
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Amount</Text>
            <Text style={styles.dataValue}>
              PHP {parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>

          <View style={[styles.dataRow, styles.spacingTop]}>
            <Text style={styles.dataLabel}>Service Fee</Text>
            <Text style={styles.dataValue}>
              PHP {serviceFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Total deduction */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount to Pay</Text>
            <Text style={styles.totalValue}>
              ₱{totalDeduction.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>

        {/* Info/Warning Notice */}
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Please review the details above. Bank transfers are processed immediately and are non-reversible once confirmed.
          </Text>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={handleConfirm}
          style={({ pressed }) => [styles.confirmButton, pressed && styles.pressed]}
        >
          <Text style={styles.confirmButtonText}>
            Confirm Transfer
          </Text>
        </Pressable>
      </View>
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
  emptyHeaderIcon: {
    width: 32,
  },
  iconPressable: {
    padding: Spacing.one,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
  },
  bankBadgeContainer: {
    alignItems: 'center',
    marginVertical: Spacing.five,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#005CE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  avatarText: {
    fontSize: 30,
  },
  bankTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002E5C',
  },
  accountNumberText: {
    fontSize: 13,
    color: '#60646C',
    marginTop: 4,
    backgroundColor: '#E6F0FF',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  dataLabel: {
    fontSize: 14,
    color: '#60646C',
  },
  dataValue: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
  },
  dataValueBold: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E1E6',
    marginVertical: Spacing.three,
  },
  aboutToSendText: {
    fontSize: 13,
    color: '#005CE6',
    fontWeight: 'bold',
    marginBottom: Spacing.two,
  },
  spacingTop: {
    marginTop: Spacing.two + 2,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#002E5C',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  warningContainer: {
    marginTop: Spacing.five,
    paddingHorizontal: Spacing.two,
  },
  warningText: {
    fontSize: 11,
    color: '#60646C',
    lineHeight: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    backgroundColor: '#F4F6F9',
  },
  confirmButton: {
    backgroundColor: '#005CE6',
    borderRadius: 24,
    paddingVertical: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
