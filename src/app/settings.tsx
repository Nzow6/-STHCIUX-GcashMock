import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

interface BadgeProps {
  label: string;
  backgroundColor: string;
  textColor: string;
}

function Badge({ label, backgroundColor, textColor }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.badgeText, { color: textColor }]}>{label}</Text>
    </View>
  );
}

interface SettingsRowProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  isLast?: boolean;
}

function SettingsRow({ icon, title, onPress, rightElement, isLast }: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowBorder,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={styles.rowTitle}>{title}</Text>
      {rightElement}
      <Ionicons name="chevron-forward" size={20} color="#007CFF" style={styles.chevron} />
    </Pressable>
  );
}

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

export default function SettingsScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleChangeMPIN = () => {
    router.push('/change-mpin-current');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Section 1: Security */}
        <SettingsSection title="Security">
          <SettingsRow
            icon={<Ionicons name="phone-portrait-outline" size={24} color="#007CFF" />}
            title="Change MPIN"
            onPress={handleChangeMPIN}
          />
          <SettingsRow
            icon={<Ionicons name="link-outline" size={24} color="#007CFF" />}
            title="Linked Devices"
          />
          <SettingsRow
            icon={<Ionicons name="shield-half-outline" size={24} color="#007CFF" />}
            title="Security Questions"
            rightElement={
              <Badge label="Set Now" backgroundColor="#E6F2FF" textColor="#007CFF" />
            }
          />
          <SettingsRow
            icon={<Ionicons name="finger-print-outline" size={24} color="#007CFF" />}
            title="Biometrics Options"
            rightElement={
              <Badge label="Enabled" backgroundColor="#E6F9ED" textColor="#34C759" />
            }
            isLast
          />
        </SettingsSection>

        {/* Section 2: Notifications */}
        <SettingsSection title="Notifications">
          <SettingsRow
            icon={<Ionicons name="megaphone-outline" size={24} color="#007CFF" />}
            title="Partner Notifications"
            isLast
          />
        </SettingsSection>

        {/* Section 3: App Version */}
        <SettingsSection title="App Version">
          <SettingsRow
            icon={<Ionicons name="copy-outline" size={24} color="#007CFF" />}
            title="v6.00.0:1120"
            isLast
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  header: {
    height: 56,
    backgroundColor: '#007CFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
  },
  backButton: {
    padding: Spacing.two,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingVertical: Spacing.three,
  },
  section: {
    marginBottom: Spacing.three,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2E5C',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: Spacing.four,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    backgroundColor: '#FFFFFF',
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#EFEFEF',
  },
  rowIcon: {
    width: 32,
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  rowTitle: {
    flex: 1,
    fontSize: 16,
    color: '#0A2E5C',
    fontWeight: '500',
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    marginRight: Spacing.two,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  chevron: {
    marginLeft: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
});
