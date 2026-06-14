import React from 'react';
import { StyleSheet, View, Text, FlatList, SectionList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Spacing } from '@/constants/theme';
import { useGlobalState } from '@/constants/state';

export default function TransactionsScreen() {
  const { transactions } = useGlobalState();

  // Group transactions by "group" property (Today / Yesterday)
  const groupTransactions = () => {
    const todayList = transactions.filter((t) => t.group === 'Today');
    const yesterdayList = transactions.filter((t) => t.group === 'Yesterday');

    const sections = [];
    if (todayList.length > 0) {
      sections.push({ title: 'Today', data: todayList });
    }
    if (yesterdayList.length > 0) {
      sections.push({ title: 'Yesterday', data: yesterdayList });
    }
    return sections;
  };

  const sections = groupTransactions();

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => {
    const isNegative = item.amount < 0;
    const formattedAmount = isNegative
      ? `-${Math.abs(item.amount).toFixed(2)}`
      : `+${item.amount.toFixed(2)}`;

    const handlePress = () => {
      router.push({
        pathname: '/transaction-details',
        params: {
          title: item.title,
          subtitle: item.subtitle,
          amount: item.amount.toString(),
          date: item.date,
          refNumber: item.refNumber || '0041852918501',
        },
      });
    };

    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.transactionItem,
          pressed && styles.pressed,
        ]}
      >
        {/* Time info */}
        <Text style={styles.timeText}>{item.date}</Text>

        {/* Transaction details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.txTitle}>{item.title}</Text>
          {item.subtitle && <Text style={styles.txSubtitle}>{item.subtitle}</Text>}
        </View>

        {/* Transaction amount */}
        <Text style={[styles.amountText, isNegative ? styles.negativeAmount : styles.positiveAmount]}>
          {formattedAmount}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Blue Header Bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction History</Text>
      </View>

      {/* Date Header Subbar */}
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderTitle}>As of Jun 14, 2026</Text>
        <Text style={styles.filterIcon}>📊</Text>
      </View>

      {/* Grouped Lists */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transaction history available.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 56,
    backgroundColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: '#F4F6F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E1E6',
  },
  subHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  filterIcon: {
    fontSize: 16,
    color: '#007CFF',
  },
  sectionHeaderContainer: {
    backgroundColor: '#F4F6F9',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E1E6',
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  listContent: {
    paddingBottom: 80, // tab inset padding
  },
  transactionItem: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F6F9',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: '#60646C',
    width: 65,
  },
  detailsContainer: {
    flex: 1,
    paddingRight: Spacing.two,
  },
  txTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  txSubtitle: {
    fontSize: 11,
    color: '#B0B4BA',
    marginTop: 2,
  },
  amountText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    width: 90,
  },
  positiveAmount: {
    color: '#002E5C', // matches dark blue/black values in GCash screenshot
  },
  negativeAmount: {
    color: '#002E5C',
  },
  emptyText: {
    textAlign: 'center',
    color: '#B0B4BA',
    marginTop: Spacing.six,
    fontSize: 14,
  },
  pressed: {
    backgroundColor: '#F0F5FF',
    opacity: 0.8,
  },
});
