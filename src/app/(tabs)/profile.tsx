import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DEFAULT_USER } from '@/constants/default-user';
import { useGlobalState } from '@/constants/state';
import { Spacing } from '@/constants/theme';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

function MenuItem({ icon, title, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={onPress} 
      activeOpacity={0.6}
      disabled={!onPress} // Disables feedback if no action is assigned
    >
      <View style={styles.menuIcon}>{icon}</View>
      <Text style={styles.menuTitle}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { activeUser } = useGlobalState();
  const user = activeUser || DEFAULT_USER;
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  const maskedName = `${user.firstName[0]}•••••• ${user.lastName[0]}••••••`;
  const maskedPhone = `${user.mobileNumber} ••••`;

  const handleNavigateToAccount = () => {
    router.push('/account-information');
  };

  const handleNavigateToSettings = () => {
    router.push('/settings');
  };

  const menuItems = [
    { id: '1', title: 'Profile Limits', icon: <Ionicons name="wallet-outline" size={24} color="#007CFF" />, onPress: () => router.push('/profile-limits') },
    { id: '2', title: 'My Linked Payments', icon: <Ionicons name="card-outline" size={24} color="#007CFF" />, onPress: () => router.push('/cards') },
    { id: '3', title: 'My Linked Accounts', icon: <MaterialCommunityIcons name="sync" size={24} color="#007CFF" />, onPress: () => router.push('/linked-accounts') },
    { id: '4', title: 'My QR Codes', icon: <Ionicons name="qr-code-outline" size={24} color="#007CFF" />, onPress: () => router.push('/my-qr') },
    { id: '5', title: 'Settings', icon: <Ionicons name="settings-outline" size={24} color="#007CFF" />, onPress: handleNavigateToSettings },
    { id: '6', title: 'GScore', icon: <Ionicons name="speedometer-outline" size={24} color="#007CFF" />, onPress: () => router.push('/gscore') },
    { id: '7', title: 'Terms and Conditions', icon: <Ionicons name="document-text-outline" size={24} color="#007CFF" />, onPress: () => router.push('/terms-conditions') },
    { id: '8', title: 'Privacy Choices', icon: <Ionicons name="shield-checkmark-outline" size={24} color="#007CFF" />, onPress: () => router.push('/privacy-choices') },
    { id: '9', title: 'Alipay+', icon: <MaterialCommunityIcons name="plus" size={24} color="#007CFF" />, onPress: () => router.push('/a-rewards') },
    { id: '10', title: 'Voucher Pocket', icon: <Ionicons name="mail-open-outline" size={24} color="#007CFF" />, onPress: () => router.push('/voucher-pocket') },
    { id: '11', title: 'Promos', icon: <Ionicons name="ticket-outline" size={24} color="#007CFF" />, onPress: () => router.push('/promos') },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Blue Header */}
      <View style={styles.header}>
        {/* Restored to a standard, non-clickable View */}
        <View style={styles.profileRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          <View style={styles.userDetails}>
            <Text style={styles.name}>{maskedName}</Text>
            <Text style={styles.phone}>{maskedPhone}</Text>
            <View style={styles.badgeRow}>
              <Ionicons name="shield-checkmark" size={12} color="#FFFFFF" />
              <Text style={styles.badgeText}>Fully Verified</Text>
            </View>
          </View>

          <View style={styles.rightIcons}>
            <Ionicons name="eye-off-outline" size={22} color="#FFFFFF" style={styles.eyeIcon} />
            
            {/* Only the chevron is clickable here */}
            <TouchableOpacity 
              onPress={handleNavigateToAccount}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              activeOpacity={0.6}
            >
              <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Clickable View Benefits Button */}
        <Pressable 
          style={({ pressed }) => [styles.viewBenefitsButton, pressed && styles.pressed]}
          onPress={() => router.push('/benefits')}
        >
          <Text style={styles.viewBenefitsText}>View Benefits</Text>
        </Pressable>
      </View>

      {/* Menu List */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItem icon={item.icon} title={item.title} onPress={item.onPress} />
        )}
        contentContainerStyle={styles.menuList}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: '#007CFF',
    paddingTop: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  avatarText: {
    color: '#007CFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  phone: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginRight: Spacing.two,
  },
  viewBenefitsButton: {
    marginTop: Spacing.three,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: Spacing.two,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  viewBenefitsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuList: {
    paddingVertical: Spacing.two,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: '#FFFFFF',
  },
  menuIcon: {
    width: 32,
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: '#0A2E5C',
    fontWeight: '500',
  },
  pressed: {
    opacity: 0.8,
  },
});