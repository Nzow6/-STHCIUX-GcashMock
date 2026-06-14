import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Clipboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Spacing } from '@/constants/theme';

export default function TransactionDetailsScreen() {
  const { title, subtitle, amount, date, refNumber } = useLocalSearchParams<{
    title: string;
    subtitle: string;
    amount: string;
    date: string;
    refNumber: string;
  }>();

  const [copied, setCopied] = useState(false);

  const numAmount = parseFloat(amount || '0');
  const isNegative = numAmount < 0;
  const formattedAmount = isNegative
    ? `-${Math.abs(numAmount).toFixed(2)}`
    : `+${numAmount.toFixed(2)}`;

  // Format heading based on transaction details
  const getHeading = () => {
    const cleanSub = subtitle ? subtitle.replace('To ', '').replace('From ', '') : '';
    if (title === 'Send Money' || title?.includes('Send')) {
      return `Transfer to ${cleanSub || 'Recipient'}`;
    }
    if (title === 'Pay via Scanned QR' || title?.includes('QR')) {
      return `Payment to ${cleanSub || 'Merchant'}`;
    }
    if (title?.includes('Cashin') || title?.includes('Cash in')) {
      return `Transfer from ${cleanSub || 'Bank'}`;
    }
    if (subtitle) {
      return `${title} ${subtitle}`;
    }
    return title || 'Transaction';
  };

  const handleCopy = () => {
    if (refNumber) {
      Clipboard.setString(refNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header Bar */}
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={({ pressed }) => [styles.iconPressable, pressed && styles.pressed]}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <View style={styles.emptyHeaderIcon} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Receipt card */}
        <View style={styles.receiptCardWrapper}>
          <View style={styles.receiptCard}>
            
            {/* Custom high-fidelity Document+Clock Icon */}
            <View style={styles.iconCircleOuter}>
              <View style={styles.documentBody}>
                <View style={styles.documentLine} />
                <View style={[styles.documentLine, { width: 10 }]} />
                <View style={[styles.documentLine, { width: 14 }]} />
                {/* Clock Badge */}
                <View style={styles.clockBadge}>
                  <View style={styles.clockCenter} />
                  <View style={styles.clockHourHand} />
                  <View style={styles.clockMinuteHand} />
                </View>
              </View>
            </View>

            {/* Blue Heading summary */}
            <Text style={styles.headingText}>{getHeading()}</Text>

            <View style={styles.divider} />

            {/* Data Rows */}
            <View style={styles.dataRow}>
              <Text style={styles.dataLabel}>Amount</Text>
              <Text style={styles.dataValue}>{formattedAmount}</Text>
            </View>

            <View style={[styles.dataRow, styles.spacingTop]}>
              <Text style={styles.dataLabel}>Date & Time</Text>
              <Text style={styles.dataValue}>{date || 'Jun 14, 2026 2:20 PM'}</Text>
            </View>

            <View style={styles.divider} />

            {/* Reference section */}
            <View style={styles.refRow}>
              <Text style={styles.refLabel}>Reference Number</Text>
              <View style={styles.refValueContainer}>
                <Text style={styles.refValue}>{refNumber || '0041848659112'}</Text>
                <Pressable onPress={handleCopy} style={styles.copyIconContainer}>
                  <Text style={[styles.copyIcon, copied && styles.copiedText]}>
                    {copied ? '✓' : '❐'}
                  </Text>
                </Pressable>
              </View>
            </View>

          </View>

          {/* Sawtooth border decoration */}
          <View style={styles.sawtoothRow}>
            {Array.from({ length: 24 }).map((_, i) => (
              <View key={i} style={styles.sawtoothTriangle} />
            ))}
          </View>
        </View>

        {copied && (
          <View style={styles.toastContainer}>
            <Text style={styles.toastText}>Reference number copied!</Text>
          </View>
        )}
      </ScrollView>

      {/* Get Help Banner Pill at bottom */}
      <View style={styles.bottomPillContainer}>
        <View style={styles.helpPill}>
          <View style={styles.questionCircle}>
            <Text style={styles.questionText}>?</Text>
          </View>
          <Text style={styles.helpBodyText}>
            Have questions or concerns about this transaction?{' '}
            <Text style={styles.getHelpLink} onPress={() => Alert.alert('Help Center', 'Redirecting to GCash Help Center...')}>
              Get Help
            </Text>
          </Text>
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
  headerRow: {
    height: 56,
    backgroundColor: '#005CE6', // Brand blue
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyHeaderIcon: {
    width: 32,
  },
  iconPressable: {
    padding: Spacing.one,
    width: 32,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.five,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.six,
    alignItems: 'center',
  },
  receiptCardWrapper: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  receiptCard: {
    padding: Spacing.five,
    paddingTop: Spacing.six,
    alignItems: 'center',
  },
  iconCircleOuter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  documentBody: {
    width: 20,
    height: 25,
    borderWidth: 2,
    borderColor: '#005CE6',
    borderRadius: 3,
    paddingTop: 4,
    paddingHorizontal: 3,
    position: 'relative',
  },
  documentLine: {
    height: 2,
    backgroundColor: '#005CE6',
    width: '100%',
    marginBottom: 3,
    borderRadius: 1,
  },
  clockBadge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#60646C',
    position: 'absolute',
    bottom: -5,
    right: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockCenter: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#60646C',
  },
  clockHourHand: {
    position: 'absolute',
    width: 1.5,
    height: 3,
    backgroundColor: '#60646C',
    top: 2,
    left: 4.5,
  },
  clockMinuteHand: {
    position: 'absolute',
    width: 3,
    height: 1.5,
    backgroundColor: '#60646C',
    top: 4.5,
    left: 4.5,
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005CE6', // Royal blue text matching screenshot
    textAlign: 'center',
    marginTop: Spacing.two,
    lineHeight: 24,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E1E6',
    marginVertical: Spacing.four,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  spacingTop: {
    marginTop: Spacing.three,
  },
  dataLabel: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  dataValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  refRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  refLabel: {
    fontSize: 13,
    color: '#60646C',
    fontWeight: '500',
  },
  refValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  refValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#002E5C', // dark blue/black
  },
  copyIconContainer: {
    padding: 2,
  },
  copyIcon: {
    fontSize: 16,
    color: '#005CE6',
    fontWeight: 'bold',
  },
  copiedText: {
    color: '#34C759',
  },
  sawtoothRow: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  sawtoothTriangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F4F6F9', // matches screen background to carve out teeth
    transform: [{ rotate: '180deg' }],
  },
  bottomPillContainer: {
    position: 'absolute',
    bottom: Spacing.five,
    left: Spacing.five,
    right: Spacing.five,
    alignItems: 'center',
  },
  helpPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E6E8EB',
  },
  questionCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#005CE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.two + 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#005CE6',
  },
  helpBodyText: {
    flex: 1,
    fontSize: 11,
    color: '#60646C',
    lineHeight: 14,
  },
  getHelpLink: {
    color: '#005CE6',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  toastContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    marginTop: Spacing.four,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
