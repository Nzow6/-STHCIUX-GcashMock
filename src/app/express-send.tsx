import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Spacing } from '@/constants/theme';
import { NumericKeypad } from '@/components/numeric-keypad';
import { globalState, useGlobalState } from '@/constants/state';

export default function ExpressSendScreen() {
  const { balance } = useGlobalState();
  const params = useLocalSearchParams<{ phone?: string; name?: string }>();

  const [activeField, setActiveField] = useState<'phone' | 'amount'>('phone');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<{ name: string; number: string } | null>(null);
  const [protectToggle, setProtectToggle] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(true);

  // Sync route params if provided (from QR code scanner)
  useEffect(() => {
    if (params.phone) {
      const cleanPhone = params.phone.replace('+63', '').replace(/\s+/g, '');
      const rawPhone = cleanPhone.startsWith('0') ? cleanPhone.slice(1) : cleanPhone;
      setSelectedContact({
        name: params.name || 'Scanned QR Merchant',
        number: params.phone,
      });
      setPhone(rawPhone);
      setActiveField('amount');
      setKeyboardVisible(true);
    }
  }, [params.phone, params.name]);

  const handleKeyPress = (digit: string) => {
    if (activeField === 'phone') {
      if (phone.length === 0 && digit !== '9') return; // Enforce starting with 9
      if (phone.length < 10) {
        setPhone((prev) => prev + digit);
      }
    } else {
      // Amount entry: avoid multiple decimals or excessive figures
      if (amount === '0' && digit === '0') return;
      if (amount.length < 6) {
        setAmount((prev) => prev + digit);
      }
    }
  };

  const handleDelete = () => {
    if (activeField === 'phone') {
      if (selectedContact) {
        setSelectedContact(null);
        setPhone('');
      } else {
        setPhone((prev) => prev.slice(0, -1));
      }
    } else {
      setAmount((prev) => prev.slice(0, -1));
    }
  };

  const handleContactPress = (name: string, number: string) => {
    setSelectedContact({ name, number });
    setPhone(number.replace('+63', '').replace(' ', '').replace('0', '')); // strip prefix to display
    setActiveField('amount'); // shift focus to amount input
    setKeyboardVisible(true);
  };

  const handleNext = () => {
    const enteredPhone = selectedContact ? selectedContact.number : `0${phone}`;
    const enteredAmount = parseFloat(amount);
    
    if (enteredPhone.length >= 10 && enteredAmount > 0 && enteredAmount <= balance) {
      router.push({
        pathname: '/send-confirm',
        params: {
          phone: enteredPhone,
          name: selectedContact ? selectedContact.name : 'Unknown Recipient',
          amount: enteredAmount.toString(),
        },
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const enteredAmount = parseFloat(amount || '0');
  const isFormValid = (selectedContact || phone.length === 10) && enteredAmount > 0 && enteredAmount <= balance;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header Bar */}
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.iconPressable, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Express Send</Text>
        <Pressable style={styles.iconPressable}>
          <View style={styles.infoCircle}>
            <Text style={styles.infoText}>i</Text>
          </View>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Ad Banner Placeholder */}
        <View style={styles.adBanner}>
          <View style={styles.adBannerContent} />
        </View>

        {/* Inputs Card */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Send to</Text>
          
          {/* Recipient Input Display */}
          <Pressable
            onPress={() => {
              setActiveField('phone');
              setSelectedContact(null);
              setKeyboardVisible(true);
            }}
            style={[
              styles.inputDisplay,
              activeField === 'phone' && styles.activeInputDisplay,
            ]}
          >
            <View style={styles.countryFlagContainer}>
              <Text style={styles.flagEmoji}>🇵🇭</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </View>
            <View style={styles.dividerVertical} />
            <Text style={styles.inputText}>
              {selectedContact ? (
                <Text style={styles.contactHighlight}>
                  {selectedContact.name} ({selectedContact.number})
                </Text>
              ) : phone.length > 0 ? (
                `9${phone.slice(1)}` // displays phone entry
              ) : (
                <Text style={styles.placeholderText}>Enter name or number</Text>
              )}
            </Text>
            <Text style={styles.contactBookIcon}>👤</Text>
          </Pressable>

          {/* Amount Input Display */}
          <View style={styles.spacingTop}>
            <Text style={styles.fieldLabel}>Amount</Text>
            <Pressable
              onPress={() => {
                setActiveField('amount');
                setKeyboardVisible(true);
              }}
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
              Available Balance: PHP {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
            {enteredAmount > balance && (
              <Text style={styles.errorText}>
                Insufficient balance
              </Text>
            )}
          </View>

          {/* Scammer / Protection Card */}
          <View style={styles.protectionBox}>
            <View style={styles.protectionHeader}>
              <Text style={styles.shieldIcon}>🛡️</Text>
              <View style={styles.protectionHeaderText}>
                <Text style={styles.protectionTitle}>I-protect ang Padala!</Text>
                <Text style={styles.protectionSubtitle}>Tap to turn on/off protection</Text>
              </View>
              <Pressable
                onPress={() => setProtectToggle(!protectToggle)}
                style={[styles.toggleBackground, protectToggle && styles.toggleActive]}
              >
                <View style={[styles.toggleCircle, protectToggle && styles.toggleCircleActive]} />
              </Pressable>
            </View>
            <Text style={styles.protectionBody}>
              Walang pinipiling oras ang mga scammer. P30 lang, 30 days protected ka na! Coverage up to P15,000.{' '}
              <Text style={styles.learnMore}>Learn more</Text>
            </Text>
          </View>

          {/* Message Input Field */}
          <View style={styles.spacingTop}>
            <Text style={styles.fieldLabel}>Message</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="(Optional)"
              placeholderTextColor="#B0B4BA"
              value={message}
              onChangeText={setMessage}
              maxLength={60}
            />
            <Text style={styles.charCount}>{message.length}/60</Text>
          </View>
        </View>

        {/* Contacts Quick List */}
        {phone.length === 0 && !selectedContact && (
          <View style={styles.contactsSection}>
            <Text style={styles.contactsHeader}>Tap any of these contacts to send them money again</Text>
            <View style={styles.contactsRow}>
              {/* idol */}
              <Pressable
                onPress={() => handleContactPress('idol', '+63 998 255 5342')}
                style={styles.contactItem}
              >
                <View style={[styles.contactCircle, { backgroundColor: '#007CFF' }]}>
                  <Text style={styles.contactInitial}>i</Text>
                </View>
                <Text style={styles.contactName}>idol</Text>
              </Pressable>

              {/* 0991 145 */}
              <Pressable
                onPress={() => handleContactPress('0991 145', '+63 991 145 1234')}
                style={styles.contactItem}
              >
                <View style={[styles.contactCircle, { backgroundColor: '#FF7A00' }]}>
                  <Text style={styles.contactInitial}>#</Text>
                </View>
                <Text style={styles.contactName} numberOfLines={1}>0991 145</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Next Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            disabled={!isFormValid}
            onPress={handleNext}
            style={({ pressed }) => [
              styles.nextButton,
              !isFormValid && styles.disabledButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.nextButtonText}>Next</Text>
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
    paddingBottom: Spacing.four,
  },
  adBanner: {
    marginVertical: Spacing.two,
    height: 70,
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  fieldLabel: {
    fontSize: 14,
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
  countryFlagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flagEmoji: {
    fontSize: 18,
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#60646C',
  },
  dividerVertical: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E1E6',
    marginHorizontal: Spacing.two,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  contactHighlight: {
    fontWeight: 'bold',
    color: '#007CFF',
  },
  placeholderText: {
    color: '#B0B4BA',
  },
  contactBookIcon: {
    fontSize: 18,
    color: '#007CFF',
  },
  spacingTop: {
    marginTop: Spacing.three,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginRight: Spacing.two,
  },
  balanceText: {
    fontSize: 11,
    color: '#60646C',
    marginTop: 6,
    marginLeft: 2,
  },
  protectionBox: {
    marginTop: Spacing.three,
    backgroundColor: '#F0F9FB',
    borderRadius: 8,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#C6EDF3',
  },
  protectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldIcon: {
    fontSize: 24,
    marginRight: Spacing.two,
  },
  protectionHeaderText: {
    flex: 1,
  },
  protectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  protectionSubtitle: {
    fontSize: 10,
    color: '#60646C',
  },
  toggleBackground: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E1E6',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#34C759',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  protectionBody: {
    fontSize: 11,
    color: '#60646C',
    lineHeight: 15,
    marginTop: Spacing.two,
  },
  learnMore: {
    color: '#007CFF',
    textDecorationLine: 'underline',
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 8,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 14,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  charCount: {
    fontSize: 10,
    color: '#B0B4BA',
    textAlign: 'right',
    marginTop: 4,
  },
  contactsSection: {
    marginTop: Spacing.three,
  },
  contactsHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#60646C',
    marginBottom: Spacing.two,
  },
  contactsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  contactItem: {
    alignItems: 'center',
    width: 70,
  },
  contactCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactInitial: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactName: {
    fontSize: 11,
    color: '#000000',
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: Spacing.three,
  },
  nextButton: {
    backgroundColor: '#007CFF',
    borderRadius: 24,
    paddingVertical: Spacing.two + 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
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
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    marginLeft: 2,
  },
});
