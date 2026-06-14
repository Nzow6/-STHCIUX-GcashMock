import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { HomeIcon, InboxIcon, ProfileIcon, QrIcon, TransactionsIcon } from '@/components/vector-icons';

// Custom Tab Bar Button for the QR FAB in the center
const QrTabBarButton = (props: any) => {
  return (
    <Pressable
      {...props}
      style={[
        props.style,
        styles.qrButtonContainer,
      ]}
    >
      <View style={styles.qrCircleOuter}>
        <View style={styles.qrCircleInner}>
          <QrIcon color="#007CFF" size={24} />
        </View>
      </View>
    </Pressable>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007CFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <InboxIcon color={color} size={22} hasBadge={true} />,
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: 'QR',
          tabBarButton: QrTabBarButton,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <TransactionsIcon color={color} size={22} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <ProfileIcon color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E1E6',
    height: 85,
    paddingBottom: 12,
    paddingTop: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
      web: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      }
    })
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  qrButtonContainer: {
    top: -12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCircleOuter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        filter: 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.2))',
      }
    })
  },
  qrCircleInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
