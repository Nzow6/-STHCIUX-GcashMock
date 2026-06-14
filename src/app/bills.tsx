import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// Real-world Philippine billers sorted alphabetically per category
const BILLERS_BY_CATEGORY: Record<string, string[]> = {
  'Electric Utilities': [
    'Aboitiz Power',
    'BENECO (Benguet Electric Cooperative)',
    'CENPELCO (Central Pangasinan Electric Cooperative)',
    'DAGUPAN ELECTRIC (Dagupan Electric Corporation)',
    'DLPC (Davao Light and Power Company)',
    'ILECO I (Iloilo I Electric Cooperative)',
    'LEYECO V (Leyte V Electric Cooperative)',
    'Meralco (Manila Electric Company)',
    'PELCO II (Pampanga II Electric Cooperative)',
    'VECS (Visayan Electric Company)'
  ],
  'Water Utilities': [
    'Angeles City Water District (ACWD)',
    'Bacolod City Water District (Baciwa)',
    'Boracay Water',
    'Cebu Water',
    'Davao City Water District (DCWD)',
    'Laguna Water',
    'Manila Water',
    'Maynilad',
    'PrimeWater',
    'Subic Water'
  ],
  'Cable/Internet': [
    'Cablelink',
    'Cignal TV',
    'Converge ICT',
    'Globe At Home',
    'Parasat Cable TV',
    'PLDT Home',
    'PT&T',
    'Royal Cable',
    'Sky Cable',
    'Streamtech'
  ],
  'Telecoms': [
    'Bayantel (Bayan Telecommunications)',
    'Dito Telecommunity',
    'Globe Business',
    'Globe Telecom',
    'GOMO',
    'PLDT Enterprise',
    'Smart Communications',
    'Sun Cellular (Legacy/Smart Postpaid)',
    'TM (Touch Mobile)',
    'TNT (Talk \'N Text)'
  ],
  'Credit Cards': [
    'BDO Credit Cards',
    'BPI Credit Cards',
    'Chinabank Credit Cards',
    'EastWest Bank Credit Cards',
    'HSBC Philippines',
    'Metrobank Credit Cards',
    'PNB Credit Cards',
    'RCBC Credit Cards',
    'Security Bank Credit Cards',
    'UnionBank Credit Cards'
  ],
  'Loans': [
    'Asialink Finance Corporation',
    'CIMB Bank (Personal Loans)',
    'Digido',
    'Home Credit',
    'JuanHand',
    'Pag-IBIG Housing/Multi-Purpose Loan',
    'SB Finance (Security Bank)',
    'Sss Loans',
    'Tala',
    'Welcome Finance'
  ],
  'Government': [
    'BIR (Bureau of Internal Revenue)',
    'DFA (Department of Foreign Affairs)',
    'LTO (Land Transportation Office)',
    'NBI (National Bureau of Investigation)',
    'Pag-IBIG Fund (HDMF)',
    'PhilHealth',
    'PRC (Professional Regulation Commission)',
    'PSA (Philippine Statistics Authority)',
    'PSA SERBILIS',
    'SSS (Social Security System)'
  ],
  'Insurance': [
    'Allianz PNB Life',
    'AXA Philippines',
    'BPI AIA (formerly BPI-Philam)',
    'Charter Ping An',
    'FWD Life Insurance',
    'Insular Life (InLife)',
    'Manulife Philippines',
    'Pioneer Insurance',
    'Pru Life UK',
    'Sun Life Philippines'
  ],
  'Transportation': [
    '2GO Travel',
    'AirAsia Philippines',
    'Angkas',
    'Cebu Pacific',
    'Grab Philippines',
    'JoyRide',
    'Philippine Airlines (PAL)',
    'RFID - Autosweep',
    'RFID - Easytrip',
    'Victory Liner'
  ],
  'Real Estate': [
    'Ayala Land',
    'Century Properties',
    'DMCI Homes',
    'Federal Land',
    'Filinvest Land',
    'Megaworld Corporation',
    'Robinsons Land',
    'Rockwell Land',
    'SM Prime Holdings',
    'Vista Land (Camella Homes)'
  ],
  'Healthcare': [
    'Asian Hospital and Medical Center',
    'Caritas Health Shield',
    'Generika Drugstore',
    'IntelliCare',
    'Makati Medical Center',
    'Maxicare',
    'Medicard Philippines',
    'PhilCare',
    'St. Luke\'s Medical Center',
    'The Medical City'
  ],
  'Schools': [
    'AMA Computer University',
    'Ateneo de Manila University (ADMU)',
    'Centro Escolar University (CEU)',
    'De La Salle University (DLSU)',
    'Far Eastern University (FEU)',
    'Mapúa University',
    'San Beda University',
    'STI College',
    'University of Santo Tomas (UST)',
    'University of the Philippines (UP)'
  ],
  'Payment Solutions': [
    'Bayad (formerly Bayad Center)',
    'Coins.ph',
    'Dragonpay',
    'ECPay',
    'GCash',
    'JuanPay',
    'Maya (formerly PayMaya)',
    'Palawan Pay',
    'PayMongo',
    'Xendit Philippines'
  ],
  'GBayanihan': [
    'ABS-CBN Foundation (Lingkod Kapamilya)',
    'Caritas Manila',
    'Gawad Kalinga',
    'GMA Kapuso Foundation',
    'Haribon Foundation',
    'Paws (Philippine Animal Welfare Society)',
    'Philippine Red Cross',
    'Tahanang Walang Hagdanan',
    'Virlanie Foundation',
    'WWF Philippines'
  ],
  'Others': [
    '7-Eleven (Cliqq)',
    'Cebuana Lhuillier',
    'Direct Agent 5 (DA5)',
    'ExpressPay',
    'Lalamove',
    'Lazada Wallet',
    'M Lhuillier',
    'PLDT Global',
    'ShopeePay',
    'SM Bills Payment'
  ]
};

// Generates cohesive color theme based on name
const getBillerColor = (name: string) => {

  const colors = [
    { bg: '#E3F2FD', text: '#0D47A1' }, // Blue
    { bg: '#E8F5E9', text: '#1B5E20' }, // Green
    { bg: '#FFF3E0', text: '#E65100' }, // Orange
    { bg: '#F3E5F5', text: '#4A148C' }, // Purple
    { bg: '#FCE4EC', text: '#880E4F' }, // Pink
    { bg: '#E0F7FA', text: '#006064' }, // Cyan
    { bg: '#E8EAF6', text: '#1A237E' }, // Indigo
  ];
  
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Helper to generate 10 real-world billers for a category
const getBillersForCategory = (category: string) => {
  const list = BILLERS_BY_CATEGORY[category] || [];
  return list.map((name, index) => {
    const isConverge = name === 'Converge ICT';
    
    // Distribute badges realistically
    let badges: string[] = [];
    if (isConverge) {
      badges = ['GCredit', 'GGives'];
    } else if (index % 3 === 0) {
      badges = ['GCredit', 'GGives'];
    } else if (index % 3 === 1) {
      badges = ['GCredit'];
    }
    
    return {
      id: `${category}-${index}`,
      name,
      badges,
      isConverge,
    };
  });
};

// Custom Category Vector Drawings
const CategoryIcon = ({ name, color }: { name: string; color: string }) => {
  switch (name) {
    case 'Electric Utilities':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>⚡</Text>
        </View>
      );
    case 'Water Utilities':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>💧</Text>
        </View>
      );
    case 'Cable/Internet':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>📺</Text>
        </View>
      );
    case 'Telecoms':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>📞</Text>
        </View>
      );
    case 'Credit Cards':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>💳</Text>
        </View>
      );
    case 'Loans':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>💸</Text>
        </View>
      );
    case 'Government':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>🏛️</Text>
        </View>
      );
    case 'Insurance':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>🛡️</Text>
        </View>
      );
    case 'Transportation':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>🚌</Text>
        </View>
      );
    case 'Real Estate':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>🏢</Text>
        </View>
      );
    case 'Healthcare':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>💼</Text>
        </View>
      );
    case 'Schools':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>🏫</Text>
        </View>
      );
    case 'Payment Solutions':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>🪙</Text>
        </View>
      );
    case 'GBayanihan':
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>❤️</Text>
        </View>
      );
    default:
      return (
        <View style={styles.catIconWrapper}>
          <Text style={{ fontSize: 20 }}>•••</Text>
        </View>
      );
  }
};

export default function PayBillsFlow() {
  const theme = useTheme();
  const router = useRouter();
  
  // State variables for Step-by-Step flow
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBiller, setSelectedBiller] = useState<any>(null);
  const [billerQuery, setBillerQuery] = useState<string>('');

  // Form Fields State (Converge Flow)
  const [amount, setAmount] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [insuranceEnabled, setInsuranceEnabled] = useState<boolean>(false);

  // Validation errors
  const [errors, setErrors] = useState<{ amount?: string; accountNumber?: string; accountName?: string }>({});

  // Dynamic Transaction Details (generated on step 4/5)
  const [gcashRef, setGcashRef] = useState<string>('');
  const [ecpayRef, setEcpayRef] = useState<string>('');
  const [transactionDate, setTransactionDate] = useState<string>('');

  const serviceFee = 12.00;

  // Categories list
  const categories = [
    'Electric Utilities', 'Water Utilities', 'Cable/Internet', 'Telecoms',
    'Credit Cards', 'Loans', 'Government', 'Insurance',
    'Transportation', 'Real Estate', 'Healthcare', 'Schools',
    'Payment Solutions', 'GBayanihan', 'Others'
  ];

  // Helper to retrieve a flat list of all billers for global search
  const getAllBillers = () => {
    const all: any[] = [];
    categories.forEach(cat => {
      all.push(...getBillersForCategory(cat));
    });
    return all;
  };

  // Helper validation
  const validateForm = () => {
    const newErrors: any = {};
    const amtNum = parseFloat(amount);
    
    if (!amount || isNaN(amtNum) || amtNum <= 0) {
      newErrors.amount = 'Please enter a valid amount.';
    }
    if (!accountNumber || accountNumber.length !== 13 || !/^\d+$/.test(accountNumber)) {
      newErrors.accountNumber = 'Account number must be exactly 13 digits.';
    }
    if (!accountName || accountName.trim().length === 0) {
      newErrors.accountName = 'Please enter account name.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(4);
    }
  };

  const handleConfirm = () => {
    // Generate receipt metadata
    const randomGcashRef = Math.floor(100000000 + Math.random() * 900000000).toString();
    const randomEcpayRef = '2026165' + Math.random().toString(36).substr(2, 7).toUpperCase();
    
    const now = new Date();
    const options: any = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = now.toLocaleDateString('en-US', options).replace(',', '');
    
    setGcashRef(randomGclean(randomGcashRef));
    setEcpayRef(randomEcpayRef);
    setTransactionDate(formattedDate);
    setStep(5);
  };

  // Helper clean function for TS warnings
  const randomGclean = (str: string) => {
    return str;
  };

  const handleBack = () => {
    if (step === 2) {
      setBillerQuery('');
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        
        {/* Step 1: GBills Landing Category List */}
        {step === 1 && (
          <View style={styles.wrapper}>
            <View style={styles.blueHeader}>
              <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </Pressable>
              <Text style={styles.headerTitle}>GBills</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.searchBarWrapper}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchBarInput}
                  placeholder="Search biller here."
                  placeholderTextColor="#8E8E93"
                  value={billerQuery}
                  onChangeText={setBillerQuery}
                />
              </View>

              {billerQuery.trim().length > 0 ? (
                <View style={styles.billersList}>
                  {getAllBillers()
                    .filter(biller => biller.name.toLowerCase().includes(billerQuery.toLowerCase()))
                    .map((biller, idx) => (
                      <Pressable
                        key={idx}
                        onPress={() => {
                          setSelectedBiller(biller);
                          setStep(3);
                        }}
                        style={({ pressed }) => [
                          styles.billerRow,
                          pressed && styles.pressedRow
                        ]}
                      >
                        <View style={styles.billerRowLeft}>
                          <View style={[
                            styles.genericLogo,
                            {
                              backgroundColor: getBillerColor(biller.name).bg,
                            }
                          ]}>
                            <Text style={[
                              styles.genericLogoText,
                              {
                                color: getBillerColor(biller.name).text,
                              }
                            ]}>
                              {biller.name.charAt(0)}
                            </Text>
                          </View>
                          
                          <View style={styles.billerNameColumn}>
                            <Text style={styles.billerName}>{biller.name}</Text>
                            <Text style={styles.billerCategoryName}>{biller.id.split('-')[0]}</Text>
                          </View>
                        </View>
                        <Text style={styles.chevronIcon}>&gt;</Text>
                      </Pressable>
                    ))}
                </View>
              ) : (
                <>
                  {/* Scheduled Bill Payments Card */}
                  <View style={styles.scheduledCard}>
                    <View style={styles.scheduledLeft}>
                      <Text style={styles.calendarIcon}>📅</Text>
                      <Text style={styles.scheduledText}>Scheduled Bill Payments</Text>
                    </View>
                    <Text style={styles.plusIcon}>➕</Text>
                  </View>

                  {/* Categories Grid */}
                  <View style={styles.sectionHeaderRow}>
                    <ThemedText type="subtitle" style={styles.sectionTitle}>Categories</ThemedText>
                    <Text style={styles.blueLink}>View All</Text>
                  </View>

                  <View style={styles.categoriesGrid}>
                    {categories.map((cat, index) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          setSelectedCategory(cat);
                          setBillerQuery('');
                          setStep(2);
                        }}
                        style={styles.gridItem}
                      >
                        <View style={styles.iconContainer}>
                          <CategoryIcon name={cat} color="#007CFF" />
                        </View>
                        <Text numberOfLines={2} style={styles.gridLabel}>{cat}</Text>
                      </Pressable>
                    ))}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        )}

        {/* Step 2: Category Billers List */}
        {step === 2 && (
          <View style={styles.wrapper}>
            <View style={styles.blueHeader}>
              <Pressable onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </Pressable>
              <Text style={styles.headerTitle}>{selectedCategory}</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.searchBarWrapper}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchBarInput}
                  placeholder="Search biller here."
                  placeholderTextColor="#8E8E93"
                  value={billerQuery}
                  onChangeText={setBillerQuery}
                />
              </View>

              <View style={styles.billersList}>
                {getBillersForCategory(selectedCategory)
                  .filter(biller => biller.name.toLowerCase().includes(billerQuery.toLowerCase()))
                  .map((biller, idx) => (
                    <Pressable
                      key={idx}
                      onPress={() => {
                        setSelectedBiller(biller);
                        setStep(3);
                      }}
                      style={({ pressed }) => [
                        styles.billerRow,
                        pressed && styles.pressedRow
                      ]}
                    >
                      <View style={styles.billerRowLeft}>
                        <View style={[
                          styles.genericLogo,
                          {
                            backgroundColor: getBillerColor(biller.name).bg,
                          }
                        ]}>
                          <Text style={[
                            styles.genericLogoText,
                            {
                              color: getBillerColor(biller.name).text,
                            }
                          ]}>
                            {biller.name.charAt(0)}
                          </Text>
                        </View>
                        
                        <View style={styles.billerNameColumn}>
                          <Text style={styles.billerName}>{biller.name}</Text>
                          <View style={styles.badgeRow}>
                            {biller.badges.map((b, bIdx) => (
                              <View key={bIdx} style={styles.badge}>
                                <Text style={styles.badgeText}>{b}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                      <Text style={styles.chevronIcon}>&gt;</Text>
                    </Pressable>
                  ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Step 3: Biller Form Input (Converge ICT) */}
        {step === 3 && (
          <View style={styles.wrapper}>
            <View style={styles.blueHeader}>
              <Pressable onPress={handleBack} style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </Pressable>
              <Text style={styles.headerTitle}>GBills</Text>
              <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Spacing.six }}>
              {/* Biller Banner */}
              <View style={styles.billerBannerCard}>
                <View style={[
                  styles.convergeLogoLarge,
                  {
                    backgroundColor: getBillerColor(selectedBiller?.name || '').bg,
                    borderColor: getBillerColor(selectedBiller?.name || '').text,
                  }
                ]}>
                  <Text style={[
                    styles.convergeLogoTextLarge,
                    {
                      color: getBillerColor(selectedBiller?.name || '').text,
                    }
                  ]}>
                    {selectedBiller?.name?.charAt(0) || 'B'}
                  </Text>
                </View>
                <View style={styles.billerBannerText}>
                  <Text style={styles.billerTitleText}>{selectedBiller?.name}</Text>
                  <Text style={styles.postingText}>Posting Period: <Text style={styles.postingBold}>real-time</Text></Text>
                </View>
              </View>

              {/* Amount Row */}
              <View style={styles.formSection}>
                <View style={styles.amountInputRow}>
                  <Text style={styles.currencySymbol}>PHP</Text>
                  <TextInput
                    keyboardType="numeric"
                    placeholder="0.00"
                    placeholderTextColor="#AEB5BC"
                    value={amount}
                    onChangeText={(val) => {
                      setAmount(val);
                      setErrors(prev => ({ ...prev, amount: undefined }));
                    }}
                    style={styles.amountInput}
                  />
                </View>
                {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
                <Text style={styles.serviceFeeInfo}>You will be charged a service fee of PHP 12.00</Text>
              </View>

              {/* Input Forms */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Account Number (13-Digit)</Text>
                <TextInput
                  maxLength={13}
                  keyboardType="numeric"
                  placeholder="Enter Account Number (13-Digit)"
                  placeholderTextColor="#AEB5BC"
                  value={accountNumber}
                  onChangeText={(val) => {
                    setAccountNumber(val);
                    setErrors(prev => ({ ...prev, accountNumber: undefined }));
                  }}
                  style={[styles.formInput, errors.accountNumber && styles.errorInput]}
                />
                {errors.accountNumber && <Text style={styles.errorText}>{errors.accountNumber}</Text>}

                <Text style={styles.inputLabel}>Account Name</Text>
                <TextInput
                  placeholder="Enter Account Name"
                  placeholderTextColor="#AEB5BC"
                  value={accountName}
                  onChangeText={(val) => {
                    setAccountName(val);
                    setErrors(prev => ({ ...prev, accountName: undefined }));
                  }}
                  style={[styles.formInput, errors.accountName && styles.errorInput]}
                />
                {errors.accountName && <Text style={styles.errorText}>{errors.accountName}</Text>}

                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  keyboardType="email-address"
                  placeholder="Enter Email Address (optional)"
                  placeholderTextColor="#AEB5BC"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.formInput}
                />
              </View>

              {/* Insurance Banner */}
              <View style={styles.insuranceCard}>
                <View style={styles.recBadge}>
                  <Text style={styles.recBadgeText}>Recommended</Text>
                </View>
                <View style={styles.insuranceMain}>
                  <Text style={styles.shieldSymbol}>🛡️</Text>
                  <View style={styles.insuranceDesc}>
                    <Text style={styles.insuranceTitle}>Siguraduhin may pambayad ng bills pag na-ospital o na-aksidente!</Text>
                    <Text style={styles.insuranceSub}>Get protection for only Php 0.00 for 30 days coverage up to Php 0.00.</Text>
                    <Text style={styles.linkText}>What is this?</Text>
                  </View>
                  <Switch
                    value={insuranceEnabled}
                    onValueChange={setInsuranceEnabled}
                    trackColor={{ false: '#D1D1D6', true: '#007CFF' }}
                  />
                </View>
              </View>

              {/* ECPay Footer Logo */}
              <View style={styles.partnerLogoWrapper}>
                <Text style={styles.ecPayText}>ec<Text style={styles.ecPayGreen}>PAY</Text></Text>
              </View>

              <Pressable onPress={handleNext} style={({ pressed }) => [styles.nextButton, pressed && styles.pressed]}>
                <Text style={styles.nextButtonText}>NEXT</Text>
              </Pressable>
            </ScrollView>
          </View>
        )}

        {/* Step 4: Confirmation Screen */}
        {step === 4 && (
          <View style={styles.wrapper}>
            <View style={[styles.blueHeader, { justifyContent: 'space-between' }]}>
              <Pressable onPress={handleBack} style={styles.backTextButton}>
                <Text style={styles.backButtonLabel}>&lt; Back</Text>
              </Pressable>
              <Text style={styles.headerTitle}>GBills</Text>
              <Pressable onPress={handleConfirm} style={styles.confirmTextButton}>
                <Text style={styles.confirmButtonLabel}>Confirm</Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* CONVERGE_ICT Banner */}
              <View style={styles.confirmBlueBanner}>
                <Text style={styles.confirmBillerTitle}>
                  {(selectedBiller?.name || 'CONVERGE_ICT').toUpperCase().replace(/\s+/g, '_')}
                </Text>
                <Text style={styles.confirmPostingText}>Posting Period: real-time</Text>
              </View>

              <View style={styles.confirmContainer}>
                <Text style={styles.confirmLabel}>You are about to pay</Text>
                <Text style={styles.confirmAmount}>PHP {(parseFloat(amount) + serviceFee).toFixed(2)}</Text>
                <Text style={styles.confirmLabel}>using your GCash</Text>

                <View style={styles.divider} />

                {/* Details Breakdown */}
                <View style={styles.confirmDetailRow}>
                  <Text style={styles.detailLabel}>Total Bill Amount</Text>
                  <Text style={styles.detailValue}>PHP {parseFloat(amount).toFixed(2)}</Text>
                </View>
                <View style={styles.confirmDetailRow}>
                  <Text style={styles.detailLabel}>Service Fee</Text>
                  <Text style={styles.detailValue}>PHP {serviceFee.toFixed(2)}</Text>
                </View>
                <View style={styles.confirmDetailRow}>
                  <Text style={styles.detailLabel}>Account Number{"\n"}(13-Digit)</Text>
                  <Text style={styles.detailValue}>{accountNumber}</Text>
                </View>
                <View style={styles.confirmDetailRow}>
                  <Text style={styles.detailLabel}>Account Name</Text>
                  <Text style={styles.detailValue}>{accountName}</Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.disclaimerText}>Please note that several billers charge a service fee.</Text>

                {/* Warnings Alert Box */}
                <View style={styles.warningAlertBox}>
                  <Text style={styles.warningText}>
                    Please ensure that the information is correct.{"\n"}
                    If any information is incorrect and requires a refund, please contact the biller directly.
                  </Text>
                </View>

                {/* ECPay Footer Logo */}
                <View style={[styles.partnerLogoWrapper, { marginTop: Spacing.four }]}>
                  <Text style={styles.ecPayText}>ec<Text style={styles.ecPayGreen}>PAY</Text></Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {/* Step 5: Success Receipt Screen */}
        {step === 5 && (
          <View style={[styles.wrapper, { backgroundColor: '#007CFF' }]}>
            {/* Success Receipt Header */}
            <View style={[styles.blueHeader, { backgroundColor: '#007CFF' }]}>
              <View style={{ width: 40 }} />
              <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>GBills</Text>
              <Pressable onPress={() => router.replace('/')} style={styles.backButton}>
                <Text style={[styles.backIcon, { color: '#FFFFFF' }]}>✕</Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: Spacing.three, paddingBottom: Spacing.five }}>
              {/* Main White Receipt Card */}
              <View style={styles.receiptCard}>
                <View style={styles.receiptHeaderRow}>
                  <View>
                    <Text style={styles.receiptBillerTitle}>{selectedBiller?.name}</Text>
                    <Text style={styles.receiptPaidText}>Paid via GCash</Text>
                  </View>
                  <View style={styles.successCircle}>
                    <Text style={styles.successCheck}>✓</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {/* Receipt Details */}
                <View style={styles.confirmDetailRow}>
                  <Text style={styles.detailLabel}>Account Number (13-Digit)</Text>
                  <Text style={[styles.detailValue, { fontWeight: 'bold' }]}>{accountNumber}</Text>
                </View>
                <View style={styles.confirmDetailRow}>
                  <Text style={styles.detailLabel}>Account Name</Text>
                  <Text style={styles.detailValue}>{accountName}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.confirmDetailRow}>
                  <Text style={styles.detailLabel}>Bill Amount</Text>
                  <Text style={[styles.detailValue, { fontWeight: 'bold' }]}>{parseFloat(amount).toFixed(2)}</Text>
                </View>
                <View style={styles.confirmDetailRow}>
                  <Text style={styles.detailLabel}>Fee</Text>
                  <Text style={[styles.detailValue, { fontWeight: 'bold' }]}>{serviceFee.toFixed(2)}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.confirmDetailRow}>
                  <Text style={[styles.detailLabel, { fontWeight: 'bold', fontSize: 16, color: '#007CFF' }]}>Total</Text>
                  <Text style={[styles.detailValue, { fontWeight: 'bold', fontSize: 16, color: '#007CFF' }]}>₱ {(parseFloat(amount) + serviceFee).toFixed(2)}</Text>
                </View>

                <View style={styles.divider} />

                <Pressable style={({ pressed }) => [styles.saveBillerBtn, pressed && styles.pressed]}>
                  <Text style={styles.saveBillerText}>+ Save Biller</Text>
                </Pressable>
              </View>

              {/* Transaction Metadata */}
              <View style={styles.metadataCard}>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Date</Text>
                  <Text style={styles.metaValue}>{transactionDate}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>GCash Reference No.</Text>
                  <View style={styles.metaCopyRow}>
                    <Text style={[styles.metaValue, { fontWeight: 'bold' }]}>{gcashRef}</Text>
                    <Text style={styles.copyIcon}> 📋</Text>
                  </View>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>ECPay Reference No.</Text>
                  <View style={styles.metaCopyRow}>
                    <Text style={[styles.metaValue, { fontWeight: 'bold' }]}>{ecpayRef}</Text>
                    <Text style={styles.copyIcon}> 📋</Text>
                  </View>
                </View>
              </View>

              {/* Promo Banner Card */}
              <View style={styles.receiptPromoCard}>
                <View style={styles.promoLeft}>
                  <Text style={styles.promoRedText}>YOUR HEALTH.{"\n"}IN YOUR{"\n"}HANDS.</Text>
                  <Text style={styles.promoSubText}>🍎 iPhone + ⌚ WATCH</Text>
                  <View style={styles.learnMoreBtn}>
                    <Text style={styles.learnMoreText}>Learn more</Text>
                  </View>
                </View>
                <View style={styles.promoRight}>
                  <Text style={{ fontSize: 48 }}>⌚</Text>
                </View>
              </View>

              {/* Carbon Footprint Card */}
              <View style={styles.ecoCard}>
                <View style={styles.ecoHeader}>
                  <Text style={styles.ecoGreenTitle}>253g (gCO2e)</Text>
                  <Text style={styles.leafIcon}>🌿</Text>
                </View>
                <Text style={styles.ecoText}>
                  By going digital, you reduce your carbon footprint from transportation, paper, and plastic.
                </Text>
              </View>
            </ScrollView>
          </View>
        )}

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  blueHeader: {
    backgroundColor: '#007CFF',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    margin: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.five,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  searchLabel: {
    color: '#8E8E93',
    fontSize: 14,
  },
  searchBarWrapper: {
    backgroundColor: '#FFFFFF',
    margin: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  searchIcon: {
    fontSize: 16,
    color: '#8E8E93',
  },
  searchBarInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1D20',
    padding: 0,
  },
  billerCategoryName: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 2,
  },
  scheduledCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: Spacing.three,
    marginBottom: Spacing.three,
    padding: Spacing.three,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  scheduledLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  calendarIcon: {
    fontSize: 20,
  },
  scheduledText: {
    color: '#0A2E5C',
    fontWeight: 'bold',
    fontSize: 14,
  },
  plusIcon: {
    fontSize: 18,
    color: '#007CFF',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    marginVertical: Spacing.two,
  },
  sectionTitle: {
    color: '#0A2E5C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  blueLink: {
    color: '#007CFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.two,
    paddingBottom: Spacing.five,
  },
  gridItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: Spacing.three,
    paddingHorizontal: Spacing.one,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  catIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 11,
    color: '#0A2E5C',
    textAlign: 'center',
  },
  billersList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  billerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3',
  },
  pressedRow: {
    backgroundColor: '#F0F5FF',
  },
  billerRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  convergeLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#34A853',
  },
  convergeLogoText: {
    color: '#34A853',
    fontWeight: 'bold',
    fontSize: 18,
  },
  genericLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F3F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genericLogoText: {
    color: '#80868B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  billerNameColumn: {
    gap: 2,
  },
  billerName: {
    color: '#0A2E5C',
    fontSize: 14,
    fontWeight: 'bold',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  badge: {
    backgroundColor: '#FFE8D6',
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FD7E14',
    fontSize: 9,
    fontWeight: 'bold',
  },
  chevronIcon: {
    color: '#007CFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  billerBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    margin: Spacing.three,
    borderRadius: 12,
    gap: Spacing.three,
  },
  convergeLogoLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#34A853',
  },
  convergeLogoTextLarge: {
    color: '#34A853',
    fontWeight: 'bold',
    fontSize: 22,
  },
  billerBannerText: {
    gap: 2,
  },
  billerTitleText: {
    color: '#0A2E5C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postingText: {
    color: '#6C757D',
    fontSize: 12,
  },
  postingBold: {
    color: '#007CFF',
    fontWeight: 'bold',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    marginHorizontal: Spacing.three,
    borderRadius: 12,
    alignItems: 'center',
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E1E6',
    width: '100%',
    paddingBottom: Spacing.two,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#0A2E5C',
    fontWeight: 'bold',
    marginRight: Spacing.two,
  },
  amountInput: {
    fontSize: 24,
    color: '#0A2E5C',
    fontWeight: 'bold',
    flex: 1,
  },
  serviceFeeInfo: {
    color: '#8E8E93',
    fontSize: 11,
    marginTop: Spacing.two,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    padding: Spacing.three,
    margin: Spacing.three,
    borderRadius: 12,
  },
  inputLabel: {
    color: '#0A2E5C',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: Spacing.two,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 8,
    padding: Spacing.two,
    fontSize: 14,
    color: '#1A1D20',
  },
  errorInput: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 11,
    marginTop: 2,
  },
  insuranceCard: {
    backgroundColor: '#E8F5E9',
    margin: Spacing.three,
    borderRadius: 12,
    padding: Spacing.three,
    position: 'relative',
  },
  recBadge: {
    position: 'absolute',
    top: -10,
    right: 12,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  insuranceMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  shieldSymbol: {
    fontSize: 24,
  },
  insuranceDesc: {
    flex: 1,
    gap: 2,
  },
  insuranceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  insuranceSub: {
    fontSize: 10,
    color: '#2E7D32',
  },
  linkText: {
    fontSize: 11,
    color: '#007CFF',
    fontWeight: 'bold',
  },
  partnerLogoWrapper: {
    alignItems: 'center',
    marginVertical: Spacing.two,
  },
  ecPayText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2E5C',
    fontStyle: 'italic',
  },
  ecPayGreen: {
    color: '#34A853',
  },
  nextButton: {
    backgroundColor: '#007CFF',
    margin: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.8,
  },
  backTextButton: {
    paddingVertical: 4,
  },
  backButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmTextButton: {
    paddingVertical: 4,
  },
  confirmButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmBlueBanner: {
    backgroundColor: '#007CFF',
    paddingVertical: Spacing.four,
    alignItems: 'center',
  },
  confirmBillerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  confirmPostingText: {
    color: '#E0E5EC',
    fontSize: 12,
    marginTop: 4,
  },
  confirmContainer: {
    padding: Spacing.three,
    alignItems: 'center',
  },
  confirmLabel: {
    color: '#6C757D',
    fontSize: 13,
    marginVertical: 2,
  },
  confirmAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1D20',
    marginVertical: Spacing.one,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E1E6',
    width: '100%',
    marginVertical: Spacing.two,
  },
  confirmDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: Spacing.one,
  },
  detailLabel: {
    color: '#6C757D',
    fontSize: 12,
  },
  detailValue: {
    color: '#1A1D20',
    fontSize: 12,
    textAlign: 'right',
  },
  disclaimerText: {
    color: '#8E8E93',
    fontSize: 11,
    textAlign: 'center',
    marginVertical: Spacing.one,
  },
  warningAlertBox: {
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
    padding: Spacing.three,
    marginVertical: Spacing.two,
    borderWidth: 1,
    borderColor: '#FFE0B2',
    width: '100%',
  },
  warningText: {
    color: '#8A6D3B',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginTop: Spacing.three,
  },
  receiptHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Spacing.one,
  },
  receiptBillerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007CFF',
  },
  receiptPaidText: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 2,
  },
  successCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCheck: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  saveBillerBtn: {
    alignItems: 'center',
    backgroundColor: '#E6F0FF',
    paddingVertical: Spacing.two,
    borderRadius: 20,
    marginTop: Spacing.one,
  },
  saveBillerText: {
    color: '#007CFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  metadataCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.three,
    marginVertical: Spacing.three,
    gap: Spacing.two,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    color: '#6C757D',
    fontSize: 12,
  },
  metaValue: {
    color: '#1A1D20',
    fontSize: 12,
  },
  metaCopyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyIcon: {
    fontSize: 12,
  },
  receiptPromoCard: {
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: Spacing.three,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },
  promoLeft: {
    gap: Spacing.one,
    flex: 1,
  },
  promoRedText: {
    color: '#4A148C',
    fontWeight: 'bold',
    fontSize: 15,
  },
  promoSubText: {
    color: '#6A1B9A',
    fontSize: 11,
  },
  learnMoreBtn: {
    backgroundColor: '#007CFF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  learnMoreText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  promoRight: {
    marginLeft: Spacing.two,
  },
  ecoCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: Spacing.three,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  ecoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  ecoGreenTitle: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 14,
  },
  leafIcon: {
    fontSize: 16,
  },
  ecoText: {
    color: '#388E3C',
    fontSize: 11,
    lineHeight: 16,
  },
});
