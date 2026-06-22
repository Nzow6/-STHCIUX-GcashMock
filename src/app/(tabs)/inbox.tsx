import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';
import { InboxIcon } from '@/components/vector-icons';
import { globalState, useGlobalState, InboxNotification } from '@/constants/state';

type FilterType = 'all' | 'transaction' | 'promo';

export default function InboxScreen() {
  const { notifications } = useGlobalState();
  const [activeTab, setActiveTab] = useState<'chats' | 'notifications'>('notifications');
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedNotif, setSelectedNotif] = useState<InboxNotification | null>(null);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    return notif.type === filter;
  });

  const unreadNotifs = filteredNotifications.filter((notif) => !notif.read);
  const readNotifs = filteredNotifications.filter((notif) => !!notif.read);

  const handleOpenNotification = (notif: InboxNotification) => {
    setSelectedNotif(notif);
  };

  const handleCloseModal = () => {
    if (selectedNotif) {
      globalState.markNotificationAsRead(selectedNotif.id);
      setSelectedNotif(null);
    }
  };

  const renderItem = (item: InboxNotification) => {
    const isRead = !!item.read;
    return (
      <Pressable
        key={item.id}
        onPress={() => handleOpenNotification(item)}
        style={({ pressed }) => [
          styles.notificationItem,
          pressed && styles.pressed,
        ]}
      >
        {/* Envelope icon */}
        <View style={styles.iconContainer}>
          <InboxIcon color={isRead ? '#8E8E93' : '#007CFF'} size={20} hasBadge={!isRead} />
        </View>

        {/* Title & Body */}
        <View style={styles.textContainer}>
          <Text style={[styles.notifTitle, !isRead && styles.unreadTitle]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.notifBody} numberOfLines={2}>
            {item.body}
          </Text>
        </View>

        {/* Time */}
        <Text style={styles.timeText}>{item.time}</Text>
      </Pressable>
    );
  };

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

      {activeTab === 'notifications' ? (
        <>
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
          <ScrollView
            style={styles.listContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Unread Section */}
            {unreadNotifs.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.listHeader}>Latest</Text>
                {unreadNotifs.map(renderItem)}
              </View>
            )}

            {/* Read Section */}
            {readNotifs.length > 0 && (
              <View style={[styles.sectionContainer, styles.readSectionMargin]}>
                <Text style={styles.listHeader}>Other messages</Text>
                {readNotifs.map(renderItem)}
              </View>
            )}

            {unreadNotifs.length === 0 && readNotifs.length === 0 && (
              <Text style={styles.emptyText}>No notifications found.</Text>
            )}
          </ScrollView>
        </>
      ) : (
        <View style={styles.chatsContainer}>
          <Text style={styles.emptyText}>No chats found.</Text>
        </View>
      )}

      {/* Details Modal */}
      <Modal
        visible={selectedNotif !== null}
        animationType="slide"
        transparent={false}
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.modalContainer} edges={['top', 'left', 'right', 'bottom']}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Pressable onPress={handleCloseModal} style={styles.modalBackButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.modalHeaderTitle}>Notification Details</Text>
            <View style={styles.modalHeaderSpacer} />
          </View>

          {/* Content */}
          <ScrollView contentContainerStyle={styles.modalContent}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTime}>{selectedNotif?.time}</Text>
              <Text style={styles.modalTitle}>{selectedNotif?.title}</Text>
              <View style={styles.modalDivider} />
              <Text style={styles.modalBody}>{selectedNotif?.body}</Text>
            </View>
          </ScrollView>

          {/* Close Button */}
          <View style={styles.modalButtonContainer}>
            <Pressable
              onPress={handleCloseModal}
              style={({ pressed }) => [
                styles.modalCloseButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
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
  scrollContent: {
    paddingBottom: 100, // tab padding
  },
  sectionContainer: {
    marginBottom: Spacing.four,
  },
  readSectionMargin: {
    marginTop: Spacing.two,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F6F9',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
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
    color: '#0A2E5C', // Default Navy
  },
  unreadTitle: {
    color: '#007CFF', // Unread Blue
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
    width: 80,
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    color: '#B0B4BA',
    marginTop: Spacing.six,
    fontSize: 14,
  },
  chatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  modalHeader: {
    height: 56,
    backgroundColor: '#007CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
  },
  modalBackButton: {
    padding: Spacing.two,
  },
  modalHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalHeaderSpacer: {
    width: 40,
  },
  modalContent: {
    padding: Spacing.four,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.four,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  modalTime: {
    fontSize: 12,
    color: '#B0B4BA',
    marginBottom: Spacing.two,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2E5C',
    lineHeight: 26,
    marginBottom: Spacing.three,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E0E1E6',
    marginVertical: Spacing.two,
  },
  modalBody: {
    fontSize: 15,
    color: '#60646C',
    lineHeight: 22,
    marginTop: Spacing.two,
  },
  modalButtonContainer: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
    backgroundColor: '#F4F6F9',
  },
  modalCloseButton: {
    backgroundColor: '#007CFF',
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
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
