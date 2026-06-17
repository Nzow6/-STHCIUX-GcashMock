import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  useColorScheme,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useGlobalState } from '@/constants/state';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import {
  ARewardsIcon,
  BillsIcon,
  BorrowIcon,
  BorrowLoadIcon,
  CardsIcon,
  CommuteIcon,
  EyeIcon,
  EyeOffIcon,
  FoodHubIcon,
  GCashJrIcon,
  GDealsIcon,
  GForestIcon,
  GInsureIcon,
  GInvestIcon,
  GLifeIcon,
  GLoanIcon,
  GSaveIcon,
  LoadIcon,
  NearDealsIcon,
  SendIcon,
  ShopIcon,
  TransferIcon,
  TravelIcon
} from '@/components/vector-icons';

type TabType = 'wallet' | 'save' | 'borrow' | 'invest';

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = useTheme();
  const { activeUser, balance } = useGlobalState();
  
  const [activeTab, setActiveTab] = useState<TabType>('wallet');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [showAd, setShowAd] = useState(true);
  const [exploreExpanded, setExploreExpanded] = useState(false);

  useEffect(() => {
    // The popup ad is shown only on the first mount of the dashboard.
    // Navigating back from other screens or tabs keeps it dismissed.
  }, []);

  // Tab Details Map for Wallet Card contents
  const tabDetails = {
    wallet: {
      label: 'AVAILABLE BALANCE',
      value: `₱ ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      hiddenValue: '₱ ••••••',
      buttonText: '+ Cash In',
    },
    save: {
      label: 'TOTAL SAVINGS',
      value: '₱ 12,450.80',
      hiddenValue: '₱ ••••••',
      buttonText: 'Deposit',
    },
    borrow: {
      label: 'GCREDIT LIMIT',
      value: '₱ 5,000.00',
      hiddenValue: '₱ ••••••',
      buttonText: 'Borrow',
    },
    invest: {
      label: 'INVESTMENT VALUE',
      value: '₱ 8,940.25',
      hiddenValue: '₱ ••••••',
      buttonText: 'Invest',
    },
  };

  const currentDetails = tabDetails[activeTab];
  const greetingName = activeUser ? activeUser.firstName : 'User';

  const toggleExplore = () => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExploreExpanded((prev) => !prev);
  };

  const exploreItems = [
    { name: 'GInsure', icon: <GInsureIcon color="#007CFF" size={28} />, route: '/ginsure' },
    { name: 'Food Hub', icon: <FoodHubIcon size={28} />, route: '/food-hub' },
    { name: 'Travel', icon: <TravelIcon size={28} />, route: '/travel' },
    { name: 'Near Deals', icon: <NearDealsIcon size={28} /> },
    { name: 'GForest', icon: <GForestIcon size={28} /> },
    { name: 'GInvest', icon: <GInvestIcon size={28} /> },
    { name: 'GDeals', icon: <GDealsIcon size={28} /> },
    { name: 'GLife', icon: <GLifeIcon size={28} /> },
    { name: 'GCash Jr.', icon: <GCashJrIcon size={28} /> },
    { name: 'Shop', icon: <ShopIcon size={28} /> },
    { name: 'Borrow load', icon: <BorrowLoadIcon size={28} /> },
    { name: 'Borrow', icon: <BorrowIcon size={28} /> },
    { name: 'GLoan', icon: <GLoanIcon size={28} /> },
  ];

  return (
    <ThemedView style={styles.container}>
      <Modal
        animationType="fade"
        transparent
        visible={showAd}
        onRequestClose={() => setShowAd(false)}
      >
        <View style={styles.adOverlay}>
          <Pressable
            onPress={() => Linking.openURL('https://www.primevideo.com/sports')}
            style={styles.adImageContainer}
          >
            <Image
              source={require('../../../assets/images/popUpAd.jpg')}
              style={styles.adImage}
              resizeMode="cover"
            />
          </Pressable>
          <Pressable
            onPress={() => setShowAd(false)}
            style={({ pressed }) => [styles.adDismissButton, pressed && styles.pressed]}
          >
            <Text style={styles.adDismissText}>Remind me Later</Text>
          </Pressable>
        </View>
      </Modal>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Section */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image 
              source={require('../../../assets/images/GCashLogo.png')} 
              style={styles.headerLogoImage} 
              resizeMode="contain"
            />
            <ThemedText style={styles.headerHello} type="title">
              Hello, {greetingName}!
            </ThemedText>
          </View>
          
          <Pressable style={({ pressed }) => [styles.helpButton, pressed && styles.pressed]}>
            <Text style={styles.helpButtonText}>HELP</Text>
          </Pressable>
        </View>

          {/* Navigation Tabs (Wallet, Save, Borrow, Invest) */}
          <View style={styles.tabsRow}>
            {(['wallet', 'save', 'borrow', 'invest'] as TabType[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tabItem,
                    isActive && styles.activeTabItem,
                    { borderTopColor: isActive ? '#007CFF' : 'transparent' }
                  ]}
                >
                  <Text 
                    style={[
                      styles.tabItemText,
                      isActive ? styles.activeTabItemText : styles.inactiveTabItemText
                    ]}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Wallet Balance Card (Seamless connection to tabs) */}
          <View style={styles.walletCard}>
            <View style={styles.balanceHeader}>
              <View style={styles.balanceLabelRow}>
                <Text style={styles.balanceLabel}>{currentDetails.label}</Text>
                <Pressable 
                  onPress={() => setBalanceVisible(!balanceVisible)}
                  style={({ pressed }) => [styles.eyePressable, pressed && styles.pressed]}
                >
                  {balanceVisible ? <EyeIcon size={16} color="#FFFFFF" /> : <EyeOffIcon size={16} color="#FFFFFF" />}
                </Pressable>
              </View>
              <Pressable style={({ pressed }) => [styles.cashInButton, pressed && styles.pressed]}>
                <Text style={styles.cashInButtonText}>{currentDetails.buttonText}</Text>
              </Pressable>
            </View>
            <Text style={styles.balanceValue}>
              {balanceVisible ? currentDetails.value : currentDetails.hiddenValue}
            </Text>
          </View>

          {/* Primary Services Grid */}
          <View style={[styles.gridContainer, { backgroundColor: theme.background }]}>
            <View style={styles.gridRow}>
              {/* Send */}
              <Pressable
                onPress={() => router.push('/send')}
                style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}
              >
                <View style={styles.iconCircle}>
                  <SendIcon color="#007CFF" size={28} />
                </View>
                <ThemedText style={styles.gridLabel} type="smallBold">Send</ThemedText>
              </Pressable>

              {/* Load */}
              <Pressable
                onPress={() => router.push('/load')}
                style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}
              >
                <View style={styles.iconCircle}>
                  <LoadIcon color="#007CFF" size={28} />
                </View>
                <ThemedText style={styles.gridLabel} type="smallBold">Load</ThemedText>
              </Pressable>

              {/* Transfer */}
              <Pressable
                onPress={() => router.push('/bank-transfer')}
                style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}
              >
                <View style={styles.iconCircle}>
                  <TransferIcon color="#007CFF" size={28} />
                </View>
                <ThemedText style={styles.gridLabel} type="smallBold">Transfer</ThemedText>
              </Pressable>

              {/* Bills */}
              <Pressable 
                onPress={() => router.push('/bills')}
                style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}
              >
                <View style={styles.iconCircle}>
                  <BillsIcon color="#007CFF" size={28} />
                </View>
                <ThemedText style={styles.gridLabel} type="smallBold">Bills</ThemedText>
              </Pressable>
            </View>

            <View style={styles.gridRow}>
              {/* GSave */}
              <Pressable
                onPress={() => router.push('/gsave')}
                style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}
              >
                <View style={styles.iconCircle}>
                  <GSaveIcon color="#007CFF" size={28} />
                </View>
                <ThemedText style={styles.gridLabel} type="smallBold">GSave</ThemedText>
              </Pressable>

              {/* Cards */}
              <Pressable
                onPress={() => router.push('/cards')}
                style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}
              >
                <View style={styles.iconCircle}>
                  <CardsIcon color="#007CFF" size={28} />
                </View>
                <ThemedText style={styles.gridLabel} type="smallBold">Cards</ThemedText>
              </Pressable>

              {/* A+ Rewards */}
              <Pressable
                onPress={() => router.push('/a-rewards')}
                style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}
              >
                <View style={styles.iconCircle}>
                  <ARewardsIcon color="#007CFF" size={28} />
                </View>
                <ThemedText style={styles.gridLabel} type="smallBold">A+ Rewards</ThemedText>
              </Pressable>

              {/* Commute */}
              <Pressable style={({ pressed }) => [styles.gridItem, pressed && styles.pressed]}>
                <View style={styles.iconCircle}>
                  <CommuteIcon color="#007CFF" size={28} />
                </View>
                <ThemedText style={styles.gridLabel} type="smallBold">Commute</ThemedText>
              </Pressable>
            </View>
          </View>

          {/* Explore the App Section */}
          <View style={styles.exploreSection}>
            <View style={styles.exploreHeader}>
              <ThemedText style={styles.exploreTitle} type="subtitle">Explore the App</ThemedText>
              <Pressable style={({ pressed }) => pressed && styles.pressed}>
                <Text style={styles.viewAllText}>View All ➔</Text>
              </Pressable>
            </View>

            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.exploreScroll}
            >
              {[
                { name: 'GInsure', icon: <GInsureIcon color="#007CFF" size={28} /> },
                { name: 'Food Hub', icon: <FoodHubIcon size={28} /> },
                { name: 'Travel', icon: <TravelIcon size={28} /> },
                { name: 'Near Deals', icon: <NearDealsIcon size={28} /> },
                { name: 'GForest', icon: <GForestIcon size={28} /> },
                { name: 'GInvest', icon: <GInvestIcon size={28} /> },
                { name: 'GDeals', icon: <GDealsIcon size={28} /> },
                { name: 'GLife', icon: <GLifeIcon size={28} /> },
                { name: 'GCash Jr.', icon: <GCashJrIcon size={28} /> },
                { name: 'Shop', icon: <ShopIcon size={28} /> },
                { name: 'Borrow load', icon: <BorrowLoadIcon size={28} /> },
                { name: 'Borrow', icon: <BorrowIcon size={28} /> },
                { name: 'GLoan', icon: <GLoanIcon size={28} /> },
              ].map((item, index) => (
                <Pressable 
                  key={index}
                  style={({ pressed }) => [styles.exploreItem, pressed && styles.pressed]}
                >
                  <View style={styles.exploreIconContainer}>
                    {item.icon}
                  </View>
                  <Text numberOfLines={2} style={styles.exploreLabel}>
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Promotion Section */}
          <View style={styles.promoSection}>
            {/* Mockup Gray skeleton line placeholder */}
            <View style={styles.skeletonLine} />
            
            {/* Promo Card */}
            <Pressable style={({ pressed }) => [styles.promoCard, pressed && styles.pressed]}>
              <View style={styles.promoBadge}>
                <Text style={styles.promoBadgeText}>PROMO</Text>
              </View>
              <Text style={styles.promoTitle}>Get a GCash Card for FREE!</Text>
              <Text style={styles.promoSubtitle}>Link your GSave account today to claim yours instantly.</Text>
              <View style={styles.promoActionRow}>
                <Text style={styles.promoActionText}>Apply Now ➔</Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#F4F6F9',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: BottomTabInset + Spacing.six,
    paddingHorizontal: Spacing.three,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pushes headerLeft to the far left, helpButton to the far right
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',  // Aligns the Logo and the Hello text side-by-side
    alignItems: 'center',  // Centers the logo and text vertically together
    gap: Spacing.two,      // Adds a clean gap between the image and the text
  },
  helpButton: {
    marginLeft: 'auto',         // Magic trick: pushes the HELP button to the far right
    // ... your other existing helpButton styles
  },
  headerLogoImage: {
    width: 90,
    height: 30,
  },
  headerHello: {
    color: '#0A2E5C',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 30,
  },
  helpButtonText: {
    color: '#007CFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E1E6',
  },
  tabItem: {
    flex: 1,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: 'transparent',
    backgroundColor: '#FFFFFF',
  },
  activeTabItem: {
    backgroundColor: '#007CFF',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopColor: '#005bb5',
  },
  tabItemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTabItemText: {
    color: '#FFFFFF',
  },
  inactiveTabItemText: {
    color: '#0A2E5C',
  },
  walletCard: {
    backgroundColor: '#007CFF',
    padding: Spacing.four,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: '#005bb5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  eyePressable: {
    padding: 4,
  },
  balanceValue: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  cashInButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.four,
  },
  cashInButtonText: {
    color: '#007CFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  gridContainer: {
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    borderRadius: 16,
    marginTop: Spacing.three,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.three,
  },
  gridItem: {
    width: '22%',
    alignItems: 'center',
    gap: Spacing.one,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 12,
    color: '#0A2E5C',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  exploreSection: {
    marginTop: Spacing.four,
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    backgroundColor: '#FFFFFF',
  },
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  exploreTitle: {
    color: '#0A2E5C',
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#007CFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  exploreScroll: {
    paddingRight: Spacing.four,
  },
  exploreItem: {
    alignItems: 'center',
    width: 65,
    marginRight: Spacing.two,
    gap: Spacing.one,
  },
  exploreIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F0F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreLabel: {
    fontSize: 10,
    color: '#0A2E5C',
    textAlign: 'center',
    height: 30,
  },
  promoSection: {
    marginTop: Spacing.four,
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    backgroundColor: '#FFFFFF',
  },
  skeletonLine: {
    height: 14,
    backgroundColor: '#E0E1E6',
    borderRadius: 7,
    width: '35%',
    marginBottom: Spacing.two,
  },
  promoCard: {
    padding: Spacing.four,
    borderRadius: 16,
    backgroundColor: '#0A2E5C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promoBadge: {
    backgroundColor: '#FF3B30',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: Spacing.two,
  },
  promoBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  promoSubtitle: {
    color: '#E0E5EC',
    fontSize: 13,
    marginBottom: Spacing.three,
  },
  promoActionRow: {
    alignSelf: 'flex-start',
  },
  promoActionText: {
    color: '#54A0FF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  adOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: Spacing.four,
  },
  adImageContainer: {
    width: '100%',
    height: '80%',
  },
  adImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  adDismissButton: {
    marginTop: Spacing.four,
    backgroundColor: '#FFFFFF',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.four,
  },
  adDismissText: {
    color: '#007CFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
