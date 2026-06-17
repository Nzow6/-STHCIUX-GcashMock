import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ScreenHeaderProps = {
  title: string;
  backgroundColor?: string;
  textColor?: string;
};

export function ScreenHeader({
  title,
  backgroundColor = '#007CFF',
  textColor = '#FFFFFF',
}: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={[styles.backIcon, { color: textColor }]}>←</Text>
      </Pressable>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    width: 40,
  },
});
