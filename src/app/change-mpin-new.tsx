import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

export default function ChangeMPINNewScreen() {
  const [newPin, setNewPin] = useState('');
  const [verifyPin, setVerifyPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!newPin || !verifyPin) {
      setError('Please fill in both MPIN fields.');
      return;
    }
    if (newPin.length !== 4 || verifyPin.length !== 4) {
      setError('MPIN must be 4 digits long.');
      return;
    }
    if (newPin !== verifyPin) {
      setError('MPINs do not match.');
      return;
    }

    setError(null);
    // Replace so the user cannot swipe back to the "Set new MPIN" screen.
    router.replace({ pathname: '/change-mpin-success', params: { pin: newPin } });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      {/* Blue Header */}
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Change GCash MPIN</Text>
        <View style={styles.headerSpacer} />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({ ios: 0, android: 24 })}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formSection}>
              <Text style={styles.title}>Set new MPIN</Text>
              <Text style={styles.subtitle}>
                Your MPIN will serve as your password to log in. For your protection, avoid using
                weak, easy to guess MPINS such as 1234, 1111, or your birthdate.
              </Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>New MPIN</Text>
                <TextInput
                  value={newPin}
                  onChangeText={setNewPin}
                  placeholder="New MPIN"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                  style={styles.input}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Verify MPIN</Text>
                <TextInput
                  value={verifyPin}
                  onChangeText={setVerifyPin}
                  placeholder="Verify MPIN"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                  style={styles.input}
                />
              </View>

              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}
              >
                <Text style={styles.submitButtonText}>SUBMIT</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  formSection: {
    marginTop: Spacing.three,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A2E5C',
    marginBottom: Spacing.two,
  },
  subtitle: {
    fontSize: 14,
    color: '#60646C',
    lineHeight: 20,
    marginBottom: Spacing.four,
  },
  inputGroup: {
    marginBottom: Spacing.four,
  },
  label: {
    fontSize: 13,
    color: '#0A2E5C',
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#E0E1E6',
    paddingVertical: Spacing.two,
    fontSize: 16,
    color: '#0A2E5C',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: Spacing.two,
  },
  buttonContainer: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
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
