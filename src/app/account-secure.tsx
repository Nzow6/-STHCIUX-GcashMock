import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

// Enable smooth accordion expand/collapse on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AccountSecureScreen() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  };

  const handleUnregister = () => {
    router.push({
      pathname: '/account-secure-confirm',
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Account Secure</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Warning Banner */}
        <View style={styles.warningBanner}>
          <Ionicons
            name="warning-outline"
            size={24}
            color="#8B6508"
            style={styles.warningIcon}
          />
          <View style={styles.warningTextContainer}>
            <Text style={styles.warningTitle}>Unregister this phone before you:</Text>
            <Text style={styles.warningList}>1. Login GCash in a new phone</Text>
            <Text style={styles.warningList}>2. Uninstall GCash in this phone</Text>
            <Text style={styles.warningFooter}>
              For your protection, once you unregister, you’ll have to register your device the
              next time you log in.
            </Text>
          </View>
        </View>

        {/* My Registered Phone Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>My Registered Phone</Text>
          <Text style={styles.cardBody}>
            Para GSafe ka, ang Registered Phone mo lang ang authorized mag-transact with your GCash
            account.
          </Text>
          <Pressable style={styles.learnMoreLink}>
            <Text style={styles.learnMoreText}>Learn more {'>'}</Text>
          </Pressable>

          <Pressable
            onPress={toggleAccordion}
            style={({ pressed }) => [styles.deviceRow, pressed && styles.pressed]}
          >
            <View style={styles.phoneIconContainer}>
              <Ionicons name="phone-portrait-outline" size={28} color="#0A2E5C" />
              <View style={styles.checkBadge}>
                <Ionicons name="checkmark" size={10} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.deviceInfo}>
              <View style={styles.currentPill}>
                <Text style={styles.currentPillText}>Current Phone</Text>
              </View>
              <Text style={styles.deviceName}>This Phone</Text>
            </View>

            <Ionicons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#007CFF"
            />
          </Pressable>

          {isExpanded && (
            <View style={styles.expandedContent}>
              <View style={styles.divider} />
              <Text style={styles.registeredDateLabel}>Registered Date</Text>
              <Text style={styles.registeredDateValue}>Mar 18, 2026 12:05PM</Text>
              <Pressable
                onPress={handleUnregister}
                style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}
              >
                <Text style={styles.outlineButtonText}>Unregister Phone</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* My Smart Watch Card */}
        <View style={styles.card}>
          <View style={styles.watchHeaderRow}>
            <Text style={styles.cardHeader}>My Smart Watch</Text>
            <Pressable style={styles.tooltipButton}>
              <Ionicons name="help-circle-outline" size={20} color="#007CFF" />
            </Pressable>
          </View>
          <Text style={styles.cardBody}>Link your watch</Text>
          <Pressable style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}>
            <Text style={styles.outlineButtonText}>Add watch</Text>
          </Pressable>
        </View>
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
    backgroundColor: '#1A68D6',
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
    padding: Spacing.four,
    gap: Spacing.three,
  },
  warningBanner: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: Spacing.three,
    flexDirection: 'row',
    gap: Spacing.three,
  },
  warningIcon: {
    marginTop: 2,
  },
  warningTextContainer: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5C4B00',
    marginBottom: Spacing.two,
  },
  warningList: {
    fontSize: 13,
    color: '#5C4B00',
    marginBottom: Spacing.one,
  },
  warningFooter: {
    fontSize: 12,
    color: '#5C4B00',
    marginTop: Spacing.two,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  cardBody: {
    fontSize: 13,
    color: '#60646C',
    lineHeight: 18,
    marginBottom: Spacing.two,
  },
  learnMoreLink: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.three,
  },
  learnMoreText: {
    fontSize: 13,
    color: '#007CFF',
    fontWeight: 'bold',
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  phoneIconContainer: {
    position: 'relative',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  deviceInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  currentPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F9ED',
    borderRadius: 12,
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
  },
  currentPillText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1B7A3E',
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A2E5C',
  },
  expandedContent: {
    marginTop: Spacing.two,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E1E6',
    marginBottom: Spacing.three,
  },
  registeredDateLabel: {
    fontSize: 12,
    color: '#60646C',
    marginBottom: Spacing.one,
  },
  registeredDateValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.three,
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: '#007CFF',
    borderRadius: 24,
    paddingVertical: Spacing.two + 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#007CFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  watchHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  tooltipButton: {
    padding: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
