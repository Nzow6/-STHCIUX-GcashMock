import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';
import { InboxIcon } from '@/components/vector-icons';
import { useGlobalState } from '@/constants/state';

type FilterType = 'all' | 'transaction' | 'promo';

export default function InboxScreen() {
  const { notifications } = useGlobalState();
  const [activeTab, setActiveTab] = useState<'chats' | 'notifications'>('notifications');
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    return notif.type === filter;
  });

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.notificationItem}>
      {/* Red envelope icon */}
      <View style={styles.iconContainer}>
        <InboxIcon color="#FF3B30" size={20} />
      </View>
      
      {/* Title & Body */}
      <View style={styles.textContainer}>
        <Text style={styles.notifTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.notifBody}>{item.body}</Text>
      </View>

      {/* Time */}
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Screen Title Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabRow}>
        <Pressable
          onPress={() => setActiveTab('chats')}
          style={[styles.tabItem, activeTab === 'chats' && styles.activeTabItem]}
        >
          <Text style={[styles.tabText, activeTab === 'chats' && styles.activeTabText]}>
            Chats <Text style={styles.betaText}>Beta</Text>
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab('notifications')}
          style={[styles.tabItem, activeTab === 'notifications' && styles.activeTabItem]}
        >
          <Text style={[styles.tabText, activeTab === 'notifications' && styles.activeTabText]}>
            Notifications
          </Text>
        </Pressable>
      </View>

      {/* Filter Row */}
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Filter</Text>
        
        {/* All Pill */}
        <Pressable
          onPress={() => setFilter('all')}
          style={[styles.filterPill, filter === 'all' && styles.filterPillActive]}
        >
          <Text style={[styles.filterPillText, filter === 'all' && styles.filterPillTextActive]}>
            All
          </Text>
        </Pressable>

        {/* Transactions Pill */}
        <Pressable
          onPress={() => setFilter('transaction')}
          style={[styles.filterPill, filter === 'transaction' && styles.filterPillActive]}
        >
          <Text style={[styles.filterPillText, filter === 'transaction' && styles.filterPillTextActive]}>
            Transactions
          </Text>
        </Pressable>

        {/* Promos Pill */}
        <Pressable
          onPress={() => setFilter('promo')}
          style={[styles.filterPill, filter === 'promo' && styles.filterPillActive]}
        >
          <Text style={[styles.filterPillText, filter === 'promo' && styles.filterPillTextActive]}>
            Promos
          </Text>
        </Pressable>
      </View>

      {/* Main List */}
      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Latest</Text>
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No notifications found.</Text>
          }
        />
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E1E6',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2E5C',
  },
  tabRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E1E6',
  },
  tabItem: {
    flex: 1,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: '#007CFF',
  },
  tabText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#60646C',
  },
  activeTabText: {
    color: '#007CFF',
  },
  betaText: {
    fontSize: 9,
    color: '#FFFFFF',
    backgroundColor: '#FF3B30',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    overflow: 'hidden',
    fontWeight: '900',
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F6F9',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginRight: Spacing.one,
  },
  filterPill: {
    paddingHorizontal: Spacing.three,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
  filterPillActive: {
    borderColor: '#007CFF',
    backgroundColor: '#F0F5FF',
  },
  filterPillText: {
    fontSize: 12,
    color: '#60646C',
    fontWeight: '500',
  },
  filterPillTextActive: {
    color: '#007CFF',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  flatListContent: {
    paddingBottom: 80, // tab padding
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F6F9',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: Spacing.three,
    paddingTop: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: Spacing.two,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  notifBody: {
    fontSize: 12,
    color: '#60646C',
    lineHeight: 16,
    marginTop: 2,
  },
  timeText: {
    fontSize: 10,
    color: '#B0B4BA',
    width: 70,
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    color: '#B0B4BA',
    marginTop: Spacing.six,
    fontSize: 14,
  },
});
