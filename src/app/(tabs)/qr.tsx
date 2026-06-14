import { Spacing } from '@/constants/theme';
import { useFocusEffect } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const SCAN_SIZE = width * 0.65;

export default function QRScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const laserAnim = useRef(new Animated.Value(0)).current;

  // Reset scanned state when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setScanned(false);
    }, [])
  );

  // Laser animation loop
  useEffect(() => {
    const startLaser = () => {
      laserAnim.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(laserAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(laserAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    startLaser();
  }, [laserAnim]);

  // Handle scanned barcodes/QRs
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    let name = 'Scanned QR Merchant';
    let phone = '+63 998 255 5342';

    if (data) {
      const cleaned = data.trim();
      if (cleaned.includes(',')) {
        const parts = cleaned.split(',');
        name = parts[0].trim();
        phone = parts[1].trim();
      } else if (/^\+?\d+$/.test(cleaned.replace(/\s+/g, ''))) {
        phone = cleaned;
        name = 'QR Recipient';
      } else {
        name = cleaned;
      }
    }

    router.push({
      pathname: '/express-send',
      params: { phone, name },
    });
  };

  // Simulate scanning trigger for emulator/fallback
  const handleSimulateScan = () => {
    handleBarCodeScanned({ data: 'G-Cafe Coffee,+639982555342' });
  };

  const laserTranslateY = laserAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, SCAN_SIZE - 10],
  });

  const hasPermission = permission && permission.granted;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Blue Header Bar */}
      <View style={styles.headerRow}>
        <View style={styles.emptyHeaderIcon} />
        <Text style={styles.headerTitle}>Scan QR Code</Text>
        <View style={styles.emptyHeaderIcon} />
      </View>

      {/* Main Viewport Area */}
      <View style={styles.viewportContainer}>
        {hasPermission ? (
          <CameraView
            style={StyleSheet.absoluteFillObject}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        ) : (
          <View style={[StyleSheet.absoluteFillObject, styles.cameraPlaceholder]}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>Camera Feed Unavailable</Text>
          </View>
        )}

        {/* Viewfinder Overlay Mask */}
        <View style={styles.overlayMask}>
          {/* Center transparent cutout box */}
          <View style={styles.scanTargetFrame}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />

            {/* Red Laser Line */}
            <Animated.View
              style={[
                styles.laserLine,
                { transform: [{ translateY: laserTranslateY }] },
              ]}
            />
          </View>
        </View>

        {/* Instruction overlay */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Align merchant QR code inside the frame to scan</Text>
        </View>
      </View>

      {/* Bottom Controls Panel */}
      <View style={styles.bottomPanel}>
        {!hasPermission && (
          <Pressable
            onPress={requestPermission}
            style={({ pressed }) => [styles.permissionButton, pressed && styles.pressed]}
          >
            <Text style={styles.permissionButtonText}>Enable Camera Access</Text>
          </Pressable>
        )}

        <View style={styles.buttonRow}>
          <Pressable
            onPress={handleSimulateScan}
            style={({ pressed }) => [styles.simulateButton, pressed && styles.pressed]}
          >
            <Text style={styles.simulateButtonText}>
              Simulate QR Scan
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/my-qr')}
            style={({ pressed }) => [styles.generateButton, pressed && styles.pressed]}
          >
            <Text style={styles.generateButtonText}>Generate QR</Text>
          </Pressable>
        </View>

        <Text style={styles.hintText}>
          You can test the physical camera or use the simulation bypass above.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  headerRow: {
    height: 56,
    backgroundColor: '#005CE6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyHeaderIcon: {
    width: 32,
  },
  viewportContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  cameraPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E24',
  },
  placeholderIcon: {
    fontSize: 48,
    color: '#8E8E93',
    marginBottom: Spacing.two,
  },
  placeholderText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  overlayMask: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  scanTargetFrame: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  laserLine: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: '#FF3B30',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 2,
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#005CE6',
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#005CE6',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#005CE6',
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#005CE6',
  },
  infoBox: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: 20,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomPanel: {
    backgroundColor: '#000000',
    padding: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionButton: {
    backgroundColor: '#005CE6',
    borderRadius: 24,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.five,
    marginBottom: Spacing.three,
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.three,
    width: '100%',
    maxWidth: 320,
  },
  simulateButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#005CE6',
    borderRadius: 24,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    flex: 1,
    alignItems: 'center',
  },
  simulateButtonText: {
    color: '#005CE6',
    fontSize: 13,
    fontWeight: 'bold',
  },
  generateButton: {
    backgroundColor: '#005CE6',
    borderRadius: 24,
    paddingVertical: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    flex: 1,
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  hintText: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: Spacing.two,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
