import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DEFAULT_USER } from '@/constants/default-user';
import { useGlobalState } from '@/constants/state';
import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function AccountInformationScreen() {
  const { activeUser } = useGlobalState();
  const user = activeUser || DEFAULT_USER;

  const userDetails = [
    { label: 'Birthdate', value: user.birthdate },
    { label: 'Nationality', value: 'Filipino' },
    { label: 'Email Address', value: user.email, editable: true },
    { label: 'Current Address', value: user.address },
  ];

  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Blue Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Account Information</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Profile Card overlapping header */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{fullName}</Text>
        <View style={styles.phoneBadge}>
          <Text style={styles.phoneText}>{user.mobileNumber}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            For enhanced account security, keep your account information updated. To edit your name and birthday, click this link.
          </Text>
        </View>

        {/* Details List */}
        <View style={styles.detailsCard}>
          {userDetails.map((item, index) => (
            <View
              key={item.label}
              style={[
                styles.detailRow,
                index !== userDetails.length - 1 && styles.detailRowBorder,
              ]}
            >
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
              {item.editable && (
                <Pressable
                  onPress={() => router.push('/authentication')}
                  style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
                >
                  <Ionicons name="pencil-outline" size={22} color="#007CFF" />
                </Pressable>
              )}
            </View>
          ))}
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <Pressable style={({ pressed }) => [styles.updateButton, pressed && styles.pressed]}>
            <Text style={styles.updateButtonText}>Update Account Information</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  header: {
    height: 120,
    backgroundColor: '#007CFF',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  backButton: {
    padding: Spacing.two,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: Spacing.two,
  },
  headerSpacer: {
    width: 40,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: Spacing.four,
    marginTop: -40,
    padding: Spacing.four,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.one,
  },
  phoneBadge: {
    backgroundColor: '#E6F0FF',
    borderRadius: 16,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
  },
  phoneText: {
    color: '#007CFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
  },
  banner: {
    backgroundColor: '#E6F0FF',
    borderRadius: 12,
    padding: Spacing.three,
    marginBottom: Spacing.four,
  },
  bannerText: {
    color: '#0A2E5C',
    fontSize: 13,
    lineHeight: 18,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3',
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: Spacing.one,
  },
  detailValue: {
    fontSize: 15,
    color: '#0A2E5C',
    fontWeight: '500',
  },
  editButton: {
    padding: Spacing.two,
  },
  bottomActions: {
    marginTop: 'auto',
    paddingVertical: Spacing.four,
    gap: Spacing.three,
  },
  updateButton: {
    backgroundColor: '#007CFF',
    borderRadius: 24,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  deleteButtonText: {
    color: '#FF3B30',
    fontSize: 15,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
