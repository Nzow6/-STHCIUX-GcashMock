import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useGlobalState } from '@/constants/state';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useGlobalState();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !navigationState?.key) return;

    const inTabs = segments[0] === '(tabs)';
    if (!isLoggedIn && inTabs) {
      router.replace('/welcome');
    }
  }, [isMounted, isLoggedIn, segments, navigationState?.key, router]);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="register" />
        <Stack.Screen name="pin-setup" />
        <Stack.Screen name="register-success" />
        <Stack.Screen name="login-pin" />
        <Stack.Screen name="send" />
        <Stack.Screen name="express-send" />
        <Stack.Screen name="send-confirm" />
        <Stack.Screen name="send-success" />
        <Stack.Screen name="transaction-details" />
        <Stack.Screen name="bank-transfer" />
        <Stack.Screen name="bank-select" />
        <Stack.Screen name="bank-pay" />
        <Stack.Screen name="bank-confirm" />
        <Stack.Screen name="bank-success" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="bills" />
        <Stack.Screen name="my-qr" />
        <Stack.Screen name="qr-display" />
        <Stack.Screen name="account-information" />
        <Stack.Screen name="authentication" />
        <Stack.Screen name="edit-email" />
        <Stack.Screen name="success" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="account-secure" />
        <Stack.Screen name="account-secure-confirm" />
        <Stack.Screen name="change-mpin-current" />
        <Stack.Screen name="change-mpin-new" />
        <Stack.Screen name="change-mpin-success" />
        <Stack.Screen name="profile-limits" />
        <Stack.Screen name="linked-accounts" />
        <Stack.Screen name="gscore" />
        <Stack.Screen name="terms-conditions" />
        <Stack.Screen name="privacy-choices" />
        <Stack.Screen name="voucher-pocket" />
        <Stack.Screen name="promos" />
        <Stack.Screen name="benefits" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
