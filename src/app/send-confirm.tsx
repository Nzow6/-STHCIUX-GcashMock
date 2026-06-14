import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Spacing } from '@/constants/theme';
import { globalState, useGlobalState } from '@/constants/state';

export default function SendConfirmScreen() {
  const { balance } = useGlobalState();
  const { phone, name, amount } = useLocalSearchParams<{
    phone: string;
    name: string;
    amount: string;
  }>();

  const [confirmChecked, setConfirmChecked] = useState(false);
  const parsedAmount = parseFloat(amount || '0');

  // Resolve recipient initials and name dynamically for high-fidelity realism
  const resolveRecipientNameAndInitials = (numStr: string | undefined, originalName: string | undefined) => {
    if (!numStr) return { name: 'Recipient', initials: 'R' };
    
    const cleanNum = numStr.replace(/\s+/g, '');
    if (cleanNum.includes('9982555342')) {
      return { name: 'C. S.', initials: 'CS' };
    }
    if (cleanNum.includes('9911451234')) {
      return { name: 'A** MA** A.', initials: 'AM' };
    }
    return { name: 'JU** L B.', initials: 'JB' };
  };

  const recipient = resolveRecipientNameAndInitials(phone, name);

  const formatPhoneDisplay = (numStr: string | undefined) => {
    if (!numStr) return '';
    // Format as: +63 9XX XXX XXXX
    const clean = numStr.replace('+63', '').replace(/\s+/g, '');
    const raw = clean.startsWith('0') ? clean.slice(1) : clean;
    if (raw.length < 10) return numStr;
    return `+63 ${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6)}`;
  };

  const handleSend = () => {
    if (confirmChecked && parsedAmount > 0 && parsedAmount <= balance) {
      // Deduct balance
      const newBalance = balance - parsedAmount;
      globalState.setBalance(newBalance);

      // Add to transaction history
      globalState.addTransaction({
        title: 'Send Money',
        subtitle: `To ${recipient.name}`,
        amount: -parsedAmount,
        type: 'send',
      });

      // Add notification to inbox
      globalState.addNotification({
        title: 'Express Send Notification',
        body: `You have sent PHP ${parsedAmount.toFixed(2)} to ${recipient.name}. ${formatPhoneDisplay(phone)}`,
        type: 'transaction',
      });

      // Navigate to success receipt screen
      router.push({
        pathname: '/send-success',
        params: {
          phone: phone,
          name: recipient.name,
          amount: amount,
        },
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isSendDisabled = !confirmChecked || parsedAmount > balance;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header Bar */}
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.iconPressable, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Express Send</Text>
        <View style={styles.emptyHeaderIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Overlay Header */}
        <View style={styles.profileBadgeContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>₱</Text>
            <View style={styles.avatarArrowContainer}>
              <Text style={styles.avatarArrow}>➔</Text>
            </View>
            <View style={styles.receiverBadge}>
              <Text style={styles.receiverBadgeText}>{recipient.initials}</Text>
            </View>
          </View>
          <Text style={styles.recipientName}>{recipient.name}</Text>
          <Text style={styles.recipientPhone}>{formatPhoneDisplay(phone)}</Text>
        </View>

        {/* Confirmation Card Details */}
        <View style={styles.card}>
          {/* GCash available balance */}
          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>GCash</Text>
            <Text style={styles.balanceValue}>
              {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.aboutToSendText}>You're about to send</Text>

          {/* Amount breakdown */}
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>Amount</Text>
            <Text style={styles.amountValue}>
              {parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Total Amount to Pay */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount to Pay</Text>
            <Text style={styles.totalValue}>
              ₱{parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>

        {/* Extra Protection Banner */}
        <View style={styles.protectionBanner}>
          <Text style={styles.shieldIcon}>🛡️</Text>
          <View style={styles.protectionTextContainer}>
            <Text style={styles.protectionTitle}>Do you want extra protection?</Text>
            <Text style={styles.protectionSubtitle}>
              PHP 30 lang, insured ang transactions mo for 30 days!
            </Text>
            <Pressable>
              <Text style={styles.protectionLink}>Protect this transaction now!</Text>
            </Pressable>
          </View>
        </View>

        {/* Checkbox Warning Box */}
        <View style={styles.reviewPromptContainer}>
          {parsedAmount > balance ? (
            <Text style={styles.insufficientBalanceText}>
              You do not have enough balance to send this amount.
            </Text>
          ) : (
            <>
              <Text style={styles.reviewText}>
                I-review para siguradong <Text style={styles.boldText}>tama at updated</Text> ang number ng padadalhan.
              </Text>

              {/* Interactive Checkbox */}
              <Pressable
                onPress={() => setConfirmChecked(!confirmChecked)}
                style={styles.checkboxRow}
              >
                <View style={[styles.checkbox, confirmChecked && styles.checkboxActive]}>
                  {confirmChecked && <Text style={styles.checkmarkText}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Yes, I confirm na tama ang number.</Text>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>

      {/* Conditional Send Button */}
      <View style={styles.buttonContainer}>
        <Pressable
          disabled={isSendDisabled}
          onPress={handleSend}
          style={({ pressed }) => [
            styles.sendButton,
            isSendDisabled && styles.sendButtonDisabled,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.sendButtonText}>
            Send ₱{parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
  emptyHeaderIcon: {
    width: 30,
  },
  iconPressable: {
    padding: Spacing.one,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  profileBadgeContainer: {
    alignItems: 'center',
    marginVertical: Spacing.four,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    marginBottom: Spacing.two,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarArrowContainer: {
    paddingHorizontal: 4,
  },
  avatarArrow: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  receiverBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00D1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiverBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recipientName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  recipientPhone: {
    fontSize: 14,
    color: '#60646C',
    marginTop: 2,
    backgroundColor: '#E6F0FF',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.one,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E1E6',
    marginVertical: Spacing.two,
  },
  aboutToSendText: {
    fontSize: 13,
    color: '#007CFF',
    fontWeight: '600',
    marginBottom: Spacing.two,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.one,
  },
  amountLabel: {
    fontSize: 14,
    color: '#60646C',
  },
  amountValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.one,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  protectionBanner: {
    backgroundColor: '#FFF8E6',
    borderRadius: 8,
    padding: Spacing.three,
    marginTop: Spacing.three,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FFE0A3',
  },
  shieldIcon: {
    fontSize: 22,
    marginRight: Spacing.two,
  },
  protectionTextContainer: {
    flex: 1,
  },
  protectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8F5E00',
  },
  protectionSubtitle: {
    fontSize: 11,
    color: '#60646C',
    marginTop: 2,
    lineHeight: 14,
  },
  protectionLink: {
    fontSize: 11,
    color: '#007CFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 6,
  },
  reviewPromptContainer: {
    alignItems: 'center',
    marginVertical: Spacing.four,
    paddingHorizontal: Spacing.two,
  },
  reviewText: {
    fontSize: 12,
    color: '#60646C',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: Spacing.three,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#007CFF',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#000000',
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    backgroundColor: '#F4F6F9',
  },
  sendButton: {
    backgroundColor: '#007CFF',
    borderRadius: 24,
    paddingVertical: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonDisabled: {
    backgroundColor: '#B2D6FF',
    shadowOpacity: 0,
    elevation: 0,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
  insufficientBalanceText: {
    fontSize: 13,
    color: '#FF3B30',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: Spacing.three,
  },
});
