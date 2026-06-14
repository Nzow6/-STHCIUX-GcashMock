import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Spacing } from '@/constants/theme';

interface NumericKeypadProps {
  onPress: (val: string) => void;
  onDelete: () => void;
  actionButton?: React.ReactNode;
}

export function NumericKeypad({ onPress, onDelete, actionButton }: NumericKeypadProps) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {keys.map((key) => (
          <View key={key} style={styles.keyContainer}>
            <Pressable
              onPress={() => onPress(key)}
              style={({ pressed }) => [styles.keyButton, pressed && styles.pressed]}
            >
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          </View>
        ))}

        {/* Bottom Row */}
        <View style={styles.bottomRowContainer}>
          <View style={styles.keyContainer}>
            {actionButton ? actionButton : <View style={styles.emptySpace} />}
          </View>

          <View style={styles.keyContainer}>
            <Pressable
              onPress={() => onPress('0')}
              style={({ pressed }) => [styles.keyButton, pressed && styles.pressed]}
            >
              <Text style={styles.keyText}>0</Text>
            </Pressable>
          </View>

          <View style={styles.keyContainer}>
            <Pressable
              onPress={onDelete}
              style={({ pressed }) => [styles.keyButton, styles.deleteButton, pressed && styles.pressed]}
            >
              <Text style={styles.deleteText}>⌫</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.five,
    paddingBottom: Spacing.four,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 320,
  },
  keyContainer: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.one,
  },
  keyButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F3',
  },
  keyText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
  },
  bottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  deleteButton: {
    backgroundColor: 'transparent',
  },
  deleteText: {
    fontSize: 20,
    color: '#000000',
  },
  emptySpace: {
    width: 64,
    height: 64,
  },
  pressed: {
    backgroundColor: '#D1D1D6',
  },
});
