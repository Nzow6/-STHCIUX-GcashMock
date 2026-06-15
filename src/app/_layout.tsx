import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
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
        <Stack.Screen name="change-mpin-current" />
        <Stack.Screen name="change-mpin-new" />
        <Stack.Screen name="change-mpin-success" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal', headerShown: true }} />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
