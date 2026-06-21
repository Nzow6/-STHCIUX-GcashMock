import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@/components/screen-header';
import { Spacing } from '@/constants/theme';

export default function PrivacyChoicesScreen() {
  const [promos, setPromos] = useState(true);
  const [ads, setAds] = useState(false);
  const [location, setLocation] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScreenHeader title="Privacy Choices" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>Manage how we use your data.</Text>
        
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Promotional Offers</Text>
              <Text style={styles.description}>Receive SMS and email updates about promos and discounts.</Text>
            </View>
            <Switch value={promos} onValueChange={setPromos} trackColor={{ true: '#34C759' }} />
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Personalized Ads</Text>
              <Text style={styles.description}>Allow data sharing with partner merchants for tailored ads.</Text>
            </View>
            <Switch value={ads} onValueChange={setAds} trackColor={{ true: '#34C759' }} />
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Location Services</Text>
              <Text style={styles.description}>Use location for relevant merchant recommendations near you.</Text>
            </View>
            <Switch value={location} onValueChange={setLocation} trackColor={{ true: '#34C759' }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9' },
  content: { padding: Spacing.four },
  headerText: { fontSize: 14, color: '#60646C', marginBottom: Spacing.four, paddingHorizontal: Spacing.one },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.two },
  textContainer: { flex: 1, paddingRight: Spacing.four },
  title: { fontSize: 16, fontWeight: 'bold', color: '#0A2E5C', marginBottom: 4 },
  description: { fontSize: 12, color: '#8E8E93', lineHeight: 16 },
  divider: { height: 1, backgroundColor: '#E0E1E6', marginVertical: Spacing.one },
});
