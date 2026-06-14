import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Spacing } from '@/constants/theme';

export default function BankSuccessScreen() {
  const { bank, amount, accountName, accountNumber, email } = useLocalSearchParams<{
    bank: string;
    amount: string;
    accountName: string;
    accountNumber: string;
    email: string;
  }>();

  const handleClose = () => {
    router.replace('/(tabs)');
  };

  const parsedAmount = parseFloat(amount || '0');
  const serviceFee = 15.00;
  const totalDeduction = parsedAmount + serviceFee;

  // Format reference number
  const mockRefNumber = React.useRef(
    Math.floor(100000000000 + Math.random() * 900000000000).toString()
  ).current;

  // Format account number for security: e.g. **** **** 1234
  const formatAccountNumberObscured = (num: string | undefined) => {
    if (!num) return '';
    if (num.length < 4) return num;
    return `**** **** ${num.slice(-4)}`;
  };

  const formattedDate = React.useRef(
    new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  ).current;

  // Generate sawtooth triangles at the bottom of the receipt card
  const renderSawtooth = () => {
    const teeth = [];
    for (let i = 0; i < 28; i++) {
      teeth.push(<View key={i} style={styles.sawtoothTriangle} />);
    }
    return teeth;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header bar with Close X on the right */}
      <View style={styles.headerRow}>
        <View style={styles.emptyHeaderIcon} />
        <Text style={styles.headerTitle}>Bank Transfer</Text>
        <Pressable onPress={handleClose} style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Receipt Wrapper Card */}
        <View style={styles.receiptCardWrapper}>
          
          {/* Main Card Body */}
          <View style={styles.receiptCard}>
            {/* Overlapping Blue Check Circle */}
            <View style={styles.checkCircle}>
              <Text style={styles.checkText}>✓</Text>
            </View>

            {/* Top White Section */}
            <View style={styles.topSection}>
              {/* Recipient/Bank Header Info */}
              <Text style={styles.recipientName}>{accountName || 'Recipient'}</Text>
              <View style={styles.phoneBox}>
                <Text style={styles.recipientPhone}>
                  {bank} • {formatAccountNumberObscured(accountNumber)}
                </Text>
              </View>
              <Text style={styles.sentViaText}>Sent via GCash Bank Transfer</Text>

              <View style={styles.divider} />

              {/* Amount */}
              <View style={styles.amountRow}>
                <Text style={styles.amountLabel}>Amount</Text>
                <Text style={styles.amountValue}>
                  {parsedAmount.toFixed(2)}
                </Text>
              </View>

              <View style={[styles.amountRow, { marginTop: Spacing.two }]}>
                <Text style={styles.amountLabel}>Service Fee</Text>
                <Text style={styles.amountValue}>
                  {serviceFee.toFixed(2)}
                </Text>
              </View>

              <View style={styles.divider} />

              {/* Total Amount Sent */}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount Paid</Text>
                <Text style={styles.totalValue}>
                  ₱{totalDeduction.toFixed(2)}
                </Text>
              </View>
            </View>
            
            {/* Bottom Light Grey-Blue Section */}
            <View style={styles.bottomSection}>
              {/* Reference & Date Footer Row */}
              <View style={styles.footerRow}>
                <Text style={styles.refText}>
                  Ref No. <Text style={styles.refBold}>{mockRefNumber}</Text>
                </Text>
                <Text style={styles.dateText}>{formattedDate}</Text>
              </View>

              {/* Carbon Footprint Green Banner */}
              <View style={styles.carbonBanner}>
                <View style={styles.carbonHeader}>
                  <Text style={styles.leafIcon}>🍃</Text>
                  <Text style={styles.carbonTitle}>279g <Text style={styles.carbonTitleSub}>(gCO2e)</Text></Text>
                </View>
                <Text style={styles.carbonBody}>
                  By going digital, you reduce your carbon footprint from transportation, paper, and plastic.
                </Text>
              </View>
            </View>
          </View>

          {/* Sawtooth jagged bottom receipt visual */}
          <View style={styles.sawtoothRow}>
            {renderSawtooth()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005CE6', // Brand blue back panel
  },
  headerRow: {
    height: 56,
    backgroundColor: '#005CE6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyHeaderIcon: {
    width: 32,
  },
  closeButton: {
    padding: Spacing.one,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '300',
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.six,
    alignItems: 'center',
  },
  receiptCardWrapper: {
    width: '100%',
    maxWidth: 360,
    marginTop: 30,
    position: 'relative',
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: '100%',
    overflow: 'hidden',
  },
  topSection: {
    backgroundColor: '#FFFFFF',
    padding: Spacing.four,
    paddingTop: Spacing.six + 10,
    alignItems: 'center',
    width: '100%',
  },
  bottomSection: {
    backgroundColor: '#F4F6FB',
    padding: Spacing.four,
    width: '100%',
  },
  checkCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#005CE6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    position: 'absolute',
    top: -25,
    left: '50%',
    marginLeft: -25,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  recipientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002E5C',
    textAlign: 'center',
  },
  phoneBox: {
    backgroundColor: '#F0F5FF',
    paddingHorizontal: Spacing.three,
    paddingVertical: 4,
    borderRadius: 14,
    marginTop: Spacing.two,
  },
  recipientPhone: {
    fontSize: 13,
    color: '#002E5C',
    fontWeight: 'bold',
  },
  sentViaText: {
    fontSize: 12,
    color: '#60646C',
    marginTop: Spacing.two + 2,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E0E1E6',
    marginVertical: Spacing.three,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  amountLabel: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
  },
  amountValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalLabel: {
    fontSize: 15,
    color: '#002E5C',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 26,
    color: '#002E5C',
    fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Spacing.four,
  },
  refText: {
    fontSize: 12,
    color: '#60646C',
  },
  refBold: {
    fontWeight: 'bold',
    color: '#002E5C',
  },
  dateText: {
    fontSize: 12,
    color: '#60646C',
  },
  carbonBanner: {
    backgroundColor: '#A9EAD2',
    borderRadius: 8,
    padding: Spacing.three,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#00BFA5',
  },
  carbonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  leafIcon: {
    fontSize: 15,
    marginRight: 6,
  },
  carbonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#004D40',
  },
  carbonTitleSub: {
    fontWeight: 'normal',
    fontSize: 11,
    color: '#00796B',
  },
  carbonBody: {
    fontSize: 12,
    color: '#004D40',
    lineHeight: 16,
  },
  sawtoothRow: {
    flexDirection: 'row',
    width: '100%',
    height: 10,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  sawtoothTriangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#005CE6',
    transform: [{ rotate: '180deg' }],
    backgroundColor: '#F4F6FB',
  },
  pressed: {
    opacity: 0.7,
  },
});
