import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Spacing } from '@/constants/theme';
import { useGlobalState } from '@/constants/state';
import { NumericKeypad } from '@/components/numeric-keypad';

export default function BankPayScreen() {
  const { balance } = useGlobalState();
  const [activeField, setActiveField] = useState<'amount' | 'accountName' | 'accountNumber' | 'email'>('amount');
  const [amount, setAmount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [email, setEmail] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(true);

  const handleKeyPress = (digit: string) => {
    if (activeField === 'amount') {
      if (amount === '0' && digit === '0') return;
      if (amount.length < 6) {
        setAmount((prev) => prev + digit);
      }
    } else if (activeField === 'accountNumber') {
      if (accountNumber.length < 12) {
        setAccountNumber((prev) => prev + digit);
      }
    }
  };

  const handleDelete = () => {
    if (activeField === 'amount') {
      setAmount((prev) => prev.slice(0, -1));
    } else if (activeField === 'accountNumber') {
      setAccountNumber((prev) => prev.slice(0, -1));
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleSendMoney = () => {
    const enteredAmount = parseFloat(amount || '0');
    if (
      enteredAmount > 0 &&
      enteredAmount + 15.00 <= balance &&
      accountName.trim().length > 0 &&
      accountNumber.length === 12
    ) {
      router.push({
        pathname: '/bank-confirm',
        params: {
          bank: 'BDO Unibank, Inc.',
          amount: enteredAmount.toString(),
          accountName: accountName.trim(),
          accountNumber: accountNumber,
          email: email.trim(),
        },
      });
    }
  };

  const enteredAmount = parseFloat(amount || '0');
  const totalCost = enteredAmount + 15.00;
  const isBalanceSufficient = totalCost <= balance;
  const isFormValid =
    enteredAmount > 0 &&
    isBalanceSufficient &&
    accountName.trim().length > 0 &&
    accountNumber.length === 12;

  // Keypad focus helpers
  const focusAmount = () => {
    setActiveField('amount');
    setKeyboardVisible(true);
    Keyboard.dismiss(); // dismiss native keyboard
  };

  const focusAccountNumber = () => {
    setActiveField('accountNumber');
    setKeyboardVisible(true);
    Keyboard.dismiss(); // dismiss native keyboard
  };

  const focusAccountName = () => {
    setActiveField('accountName');
    setKeyboardVisible(false); // hide custom keypad
  };

  const focusEmail = () => {
    setActiveField('email');
    setKeyboardVisible(false); // hide custom keypad
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

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Bank Brand Header (BDO Logo + Name) */}
        <View style={styles.bankBrandContainer}>
          <View style={styles.bdoLogoContainer}>
            <Text style={styles.bdoLogoText}>BDO</Text>
            <View style={styles.bdoLogoYellowRing} />
          </View>
          <Text style={styles.bankName}>BDO Unibank, Inc.</Text>
        </View>

        {/* Form Fields Card */}
        <View style={styles.card}>
          {/* Amount Field */}
          <Text style={styles.fieldLabel}>Amount (Max of PHP 50,000.00)</Text>
          <Pressable
            onPress={focusAmount}
            style={[
              styles.inputDisplay,
              activeField === 'amount' && styles.activeInputDisplay,
            ]}
          >
            <Text style={styles.currencySymbol}>₱</Text>
            <Text style={styles.inputText}>
              {amount.length > 0 ? (
                parseFloat(amount).toLocaleString('en-US')
              ) : (
                <Text style={styles.placeholderText}>0.00</Text>
              )}
            </Text>
          </Pressable>
          
          <Text style={styles.balanceText}>
            Available balance: PHP {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          {enteredAmount > 0 && !isBalanceSufficient && (
            <Text style={styles.errorText}>Insufficient balance</Text>
          )}

          {/* Account Name */}
          <View style={styles.spacingTop}>
            <Text style={styles.fieldLabel}>Account Name</Text>
            <TextInput
              style={[
                styles.messageInput,
                activeField === 'accountName' && styles.activeMessageInput,
              ]}
              placeholder="Max of 50 characters"
              placeholderTextColor="#B0B4BA"
              value={accountName}
              onChangeText={setAccountName}
              maxLength={50}
              onFocus={focusAccountName}
            />
          </View>

          {/* Account Number */}
          <View style={styles.spacingTop}>
            <Text style={styles.fieldLabel}>Account Number</Text>
            <Pressable
              onPress={focusAccountNumber}
              style={[
                styles.inputDisplay,
                activeField === 'accountNumber' && styles.activeInputDisplay,
              ]}
            >
              <Text style={styles.inputText}>
                {accountNumber.length > 0 ? (
                  accountNumber
                ) : (
                  <Text style={styles.placeholderText}>12 digits</Text>
                )}
              </Text>
            </Pressable>
            {accountNumber.length > 0 && accountNumber.length < 12 && (
              <Text style={styles.warningHintText}>Account number must be 12 digits</Text>
            )}
          </View>

          {/* Send Receipt To */}
          <View style={styles.spacingTop}>
            <Text style={styles.fieldLabel}>Send Receipt To (Optional)</Text>
            <TextInput
              style={[
                styles.messageInput,
                activeField === 'email' && styles.activeMessageInput,
              ]}
              placeholder="email@address.com"
              placeholderTextColor="#B0B4BA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={focusEmail}
            />
          </View>
        </View>

        {/* Transaction Fee Notice */}
        <Text style={styles.feeNoticeText}>
          A PHP 15.00 fee will be charged per transaction.
        </Text>

        {/* Send Money Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            disabled={!isFormValid}
            onPress={handleSendMoney}
            style={({ pressed }) => [
              styles.sendButton,
              !isFormValid && styles.disabledButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.sendButtonText}>Send Money</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Numerical Keypad */}
      {keyboardVisible && (
        <NumericKeypad
          onPress={handleKeyPress}
          onDelete={handleDelete}
          actionButton={
            <Pressable
              onPress={() => setKeyboardVisible(false)}
              style={({ pressed }) => [styles.doneKeyButton, pressed && styles.pressed]}
            >
              <Text style={styles.doneKeyText}>Done</Text>
            </Pressable>
          }
        />
      )}
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
    paddingTop: Spacing.four,
    paddingBottom: Spacing.six,
  },
  bankBrandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.four,
    paddingHorizontal: Spacing.one,
  },
  bdoLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0033A0', // BDO Dark Blue
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: Spacing.three,
  },
  bdoLogoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  bdoLogoYellowRing: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFEE00', // Yellow Ring next to BDO text
    marginLeft: 5,
  },
  bankName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002E5C',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.one,
  },
  inputDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E1E6',
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    backgroundColor: '#FFFFFF',
  },
  activeInputDisplay: {
    borderColor: '#007CFF',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginRight: Spacing.two,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#B0B4BA',
  },
  balanceText: {
    fontSize: 11,
    color: '#60646C',
    marginTop: 6,
    marginLeft: 2,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    marginLeft: 2,
  },
  warningHintText: {
    color: '#FF9500',
    fontSize: 11,
    marginTop: 4,
    marginLeft: 2,
  },
  spacingTop: {
    marginTop: Spacing.three,
  },
  messageInput: {
    borderWidth: 1.5,
    borderColor: '#E0E1E6',
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    fontSize: 14,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  activeMessageInput: {
    borderColor: '#007CFF',
  },
  feeNoticeText: {
    fontSize: 11,
    color: '#0A2E5C',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Spacing.five,
    marginBottom: Spacing.two,
  },
  buttonContainer: {
    marginVertical: Spacing.two,
  },
  sendButton: {
    backgroundColor: '#005CE6', // brand active blue
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
  disabledButton: {
    backgroundColor: '#B2D6FF', // disabled BDO send money color matching screenshot
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  doneKeyButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  doneKeyText: {
    color: '#007CFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
