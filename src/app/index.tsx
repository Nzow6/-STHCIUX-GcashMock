import { Redirect } from 'expo-router';
import React from 'react';

import { useGlobalState } from '@/constants/state';

export default function Index() {
  const { isLoggedIn } = useGlobalState();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/welcome" />;
}
