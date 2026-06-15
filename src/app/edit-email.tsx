import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function EditEmailScreen() {
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!newEmail || !confirmEmail) {
      setError('Please fill in both email fields.');
      return;
    }
    if (newEmail !== confirmEmail) {
      setError('Emails do not match.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    router.push({ pathname: '/success', params: { email: newEmail } });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Email</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 24 })}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.formCard}>
            <Text style={styles.title}>Update your email</Text>
            <Text style={styles.subtitle}>All GCash notifications will be sent to this email.</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>New email</Text>
              <TextInput
                value={newEmail}
                onChangeText={setNewEmail}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#8E8E93"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm New Email</Text>
              <TextInput
                value={confirmEmail}
                onChangeText={setConfirmEmail}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor="#8E8E93"
              />
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  flex: {
    flex: 1,
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
    flexGrow: 1,
    padding: Spacing.four,
    justifyContent: 'space-between',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: 14,
    color: '#60646C',
    marginBottom: Spacing.four,
  },
  inputGroup: {
    marginBottom: Spacing.three,
  },
  label: {
    fontSize: 13,
    color: '#0A2E5C',
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 12,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 15,
    color: '#0A2E5C',
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: Spacing.two,
  },
  buttonContainer: {
    paddingTop: Spacing.four,
  },
  submitButton: {
    backgroundColor: '#007CFF',
    borderRadius: 24,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.8,
  },
});
