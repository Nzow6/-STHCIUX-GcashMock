import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IconProps {
  color?: string;
  size?: number;
}

export function GLogo({ size = 32 }: { size?: number }) {
  const scale = size / 32;
  return (
    <View style={[styles.gLogoContainer, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.gLogoText, { fontSize: 20 * scale, lineHeight: 24 * scale }]}>G</Text>
      <View style={[styles.gLogoLine, { width: 3 * scale, height: 14 * scale, left: 6 * scale, top: 9 * scale }]} />
    </View>
  );
}

export function HomeIcon({ color = '#6C757D', size = 24 }: IconProps) {
  const scale = size / 24;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[styles.roof, { borderBottomColor: color, borderLeftWidth: 9 * scale, borderRightWidth: 9 * scale, borderBottomWidth: 8 * scale, top: 1 * scale }]} />
      <View style={[styles.houseBody, { borderColor: color, borderWidth: 2 * scale, width: 14 * scale, height: 11 * scale, bottom: 2 * scale, borderTopWidth: 0 }]} />
    </View>
  );
}

export function InboxIcon({ color = '#6C757D', size = 24, hasBadge = false }: IconProps & { hasBadge?: boolean }) {
  const scale = size / 24;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[styles.envelope, { borderColor: color, borderWidth: 2 * scale, width: 18 * scale, height: 13 * scale, borderRadius: 2 * scale }]}>
        <View style={[styles.envelopeFlap, { borderColor: color, borderLeftWidth: 1.5 * scale, borderBottomWidth: 1.5 * scale, width: 10 * scale, height: 6 * scale, transform: [{ rotate: '-45deg' }], left: 2.5 * scale, top: -1.5 * scale }]} />
      </View>
      {hasBadge && (
        <View style={[styles.redBadge, { width: 8 * scale, height: 8 * scale, borderRadius: 4 * scale, right: 1 * scale, top: 1 * scale }]} />
      )}
    </View>
  );
}

export function QrIcon({ color = '#FFFFFF', size = 24 }: IconProps) {
  const scale = size / 24;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* 4 Corner brackets */}
      <View style={[styles.qrCorner, { borderColor: color, borderTopWidth: 2 * scale, borderLeftWidth: 2 * scale, top: 3 * scale, left: 3 * scale, width: 6 * scale, height: 6 * scale }]} />
      <View style={[styles.qrCorner, { borderColor: color, borderTopWidth: 2 * scale, borderRightWidth: 2 * scale, top: 3 * scale, right: 3 * scale, width: 6 * scale, height: 6 * scale }]} />
      <View style={[styles.qrCorner, { borderColor: color, borderBottomWidth: 2 * scale, borderLeftWidth: 2 * scale, bottom: 3 * scale, left: 3 * scale, width: 6 * scale, height: 6 * scale }]} />
      <View style={[styles.qrCorner, { borderColor: color, borderBottomWidth: 2 * scale, borderRightWidth: 2 * scale, bottom: 3 * scale, right: 3 * scale, width: 6 * scale, height: 6 * scale }]} />
      {/* Center scan line or blocks */}
      <View style={[styles.qrBlock, { backgroundColor: color, width: 4 * scale, height: 4 * scale, top: 6 * scale, left: 6 * scale }]} />
      <View style={[styles.qrBlock, { backgroundColor: color, width: 4 * scale, height: 4 * scale, bottom: 6 * scale, right: 6 * scale }]} />
      <View style={[styles.qrLine, { backgroundColor: color, height: 1.5 * scale, width: 14 * scale, top: 11.5 * scale }]} />
    </View>
  );
}

export function TransactionsIcon({ color = '#6C757D', size = 24 }: IconProps) {
  const scale = size / 24;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[styles.paper, { borderColor: color, borderWidth: 2 * scale, width: 16 * scale, height: 19 * scale, borderRadius: 2 * scale }]}>
        <View style={[styles.paperLine, { backgroundColor: color, width: 8 * scale, height: 1.5 * scale, top: 3 * scale, left: 2 * scale }]} />
        <View style={[styles.paperLine, { backgroundColor: color, width: 10 * scale, height: 1.5 * scale, top: 6 * scale, left: 2 * scale }]} />
        <View style={[styles.paperLine, { backgroundColor: color, width: 6 * scale, height: 1.5 * scale, top: 9 * scale, left: 2 * scale }]} />
      </View>
    </View>
  );
}

export function ProfileIcon({ color = '#6C757D', size = 24 }: IconProps) {
  const scale = size / 24;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[styles.profileHead, { borderColor: color, borderWidth: 2 * scale, width: 8 * scale, height: 8 * scale, borderRadius: 4 * scale, top: 3 * scale }]} />
      <View style={[styles.profileBody, { borderColor: color, borderWidth: 2 * scale, width: 16 * scale, height: 8 * scale, borderBottomWidth: 0, borderTopLeftRadius: 6 * scale, borderTopRightRadius: 6 * scale, bottom: 2 * scale }]} />
    </View>
  );
}

export function SendIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[styles.sendCard, { borderColor: color, borderWidth: 2 * scale, width: 22 * scale, height: 15 * scale, borderRadius: 3 * scale }]}>
        {/* Left arrow */}
        <View style={[styles.arrowHead, { borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: color, borderTopWidth: 3.5 * scale, borderBottomWidth: 3.5 * scale, borderRightWidth: 5 * scale, left: 2 * scale, top: 2 * scale }]} />
        <View style={[styles.arrowShaft, { backgroundColor: color, width: 6 * scale, height: 1.5 * scale, left: 6 * scale, top: 4.7 * scale }]} />
        {/* Right arrow */}
        <View style={[styles.arrowHead, { borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: color, borderTopWidth: 3.5 * scale, borderBottomWidth: 3.5 * scale, borderLeftWidth: 5 * scale, right: 2 * scale, bottom: 2.5 * scale }]} />
        <View style={[styles.arrowShaft, { backgroundColor: color, width: 6 * scale, height: 1.5 * scale, right: 6 * scale, bottom: 3.5 * scale }]} />
      </View>
    </View>
  );
}

export function LoadIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[styles.phoneFrame, { borderColor: color, borderWidth: 2 * scale, width: 14 * scale, height: 23 * scale, borderRadius: 3 * scale }]}>
        <View style={[styles.phoneScreenLine, { backgroundColor: color, width: 10 * scale, height: 1 * scale, top: 2 * scale, left: 0 }]} />
        <View style={[styles.phoneScreenLine, { backgroundColor: color, width: 10 * scale, height: 1 * scale, bottom: 2 * scale, left: 0 }]} />
      </View>
      {/* Arrow pointing in */}
      <View style={[styles.arrowHead, { borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: color, borderTopWidth: 4 * scale, borderBottomWidth: 4 * scale, borderLeftWidth: 5 * scale, left: 16 * scale, top: 10 * scale }]} />
      <View style={[styles.arrowShaft, { backgroundColor: color, width: 8 * scale, height: 2 * scale, left: 19 * scale, top: 13 * scale }]} />
    </View>
  );
}

export function TransferIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Temple roof */}
      <View style={[styles.roof, { borderBottomColor: color, borderLeftWidth: 11 * scale, borderRightWidth: 11 * scale, borderBottomWidth: 5 * scale, top: 2 * scale }]} />
      {/* Columns */}
      <View style={[styles.row, { width: 18 * scale, height: 10 * scale, top: 2 * scale, justifyContent: 'space-between', paddingHorizontal: 1.5 * scale }]}>
        <View style={[styles.column, { backgroundColor: color, width: 2 * scale, height: 10 * scale }]} />
        <View style={[styles.column, { backgroundColor: color, width: 2 * scale, height: 10 * scale }]} />
        <View style={[styles.column, { backgroundColor: color, width: 2 * scale, height: 10 * scale }]} />
        <View style={[styles.column, { backgroundColor: color, width: 2 * scale, height: 10 * scale }]} />
      </View>
      {/* Base */}
      <View style={[styles.base, { backgroundColor: color, width: 20 * scale, height: 2 * scale, top: 2 * scale }]} />
    </View>
  );
}

export function BillsIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Bill receipt */}
      <View style={[styles.paper, { borderColor: color, borderWidth: 2 * scale, width: 16 * scale, height: 21 * scale, borderRadius: 2 * scale, top: 1 * scale }]}>
        <View style={[styles.paperLine, { backgroundColor: color, width: 6 * scale, height: 1.5 * scale, top: 3 * scale, left: 2 * scale }]} />
        <View style={[styles.paperLine, { backgroundColor: color, width: 10 * scale, height: 1.5 * scale, top: 6 * scale, left: 2 * scale }]} />
        <View style={[styles.paperLine, { backgroundColor: color, width: 8 * scale, height: 1.5 * scale, top: 9 * scale, left: 2 * scale }]} />
        <View style={[styles.paperLine, { backgroundColor: color, width: 10 * scale, height: 1.5 * scale, top: 12 * scale, left: 2 * scale }]} />
      </View>
      
      {/* Checkmark circle badge in the icon */}
      <View style={[styles.checkCircle, { borderColor: color, borderWidth: 1.5 * scale, width: 10 * scale, height: 10 * scale, borderRadius: 5 * scale, top: -2 * scale, right: -4 * scale }]}>
        <View style={[styles.checkmark, { borderColor: color, borderRightWidth: 1.5 * scale, borderBottomWidth: 1.5 * scale, width: 3 * scale, height: 5 * scale, transform: [{ rotate: '40deg' }], left: 2 * scale, top: 0.5 * scale }]} />
      </View>
    </View>
  );
}

export function GSaveIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Piggy body (circle) */}
      <View style={[styles.piggyBody, { borderColor: color, borderWidth: 2 * scale, width: 20 * scale, height: 16 * scale, borderRadius: 8 * scale, top: 2 * scale }]}>
        {/* Slot */}
        <View style={[styles.piggySlot, { backgroundColor: color, width: 6 * scale, height: 1.5 * scale, top: 2 * scale, left: 5 * scale }]} />
        {/* Snout */}
        <View style={[styles.piggySnout, { borderColor: color, borderWidth: 1.5 * scale, width: 4 * scale, height: 5 * scale, borderRadius: 2 * scale, left: -3 * scale, top: 4 * scale }]} />
        {/* Eye */}
        <View style={[styles.piggyEye, { backgroundColor: color, width: 2 * scale, height: 2 * scale, borderRadius: 1 * scale, left: 3 * scale, top: 2 * scale }]} />
      </View>
      {/* Ears */}
      <View style={[styles.piggyEar, { borderBottomColor: color, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderLeftWidth: 3 * scale, borderRightWidth: 3 * scale, borderBottomWidth: 4 * scale, top: -1 * scale, right: 4 * scale }]} />
    </View>
  );
}

export function CardsIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Back card */}
      <View style={[styles.creditCard, { borderColor: color, borderWidth: 1.5 * scale, width: 18 * scale, height: 12 * scale, borderRadius: 2 * scale, transform: [{ rotate: '-5deg' }], top: -1 * scale, left: -2 * scale }]} />
      {/* Front card */}
      <View style={[styles.creditCardActive, { borderColor: color, borderWidth: 2 * scale, width: 18 * scale, height: 12 * scale, borderRadius: 2 * scale, top: 4 * scale, right: -2 * scale, backgroundColor: '#FFFFFF' }]}>
        {/* Card logo strip */}
        <View style={[styles.cardStrip, { backgroundColor: color, width: 4 * scale, height: 2 * scale, top: 2 * scale, left: 2 * scale }]} />
      </View>
    </View>
  );
}

export function ARewardsIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Ticket body */}
      <View style={[styles.ticket, { borderColor: color, borderWidth: 2 * scale, width: 22 * scale, height: 14 * scale, borderRadius: 2 * scale, borderStyle: 'solid' }]}>
        {/* Star sparkles */}
        <Text style={{ fontSize: 8 * scale, color, fontWeight: 'bold', top: -1.5 * scale, left: 1.5 * scale }}>A+</Text>
      </View>
      {/* Sparkles */}
      <Text style={{ position: 'absolute', right: -2 * scale, top: -2 * scale, fontSize: 10 * scale, color: '#FFB800' }}>✨</Text>
    </View>
  );
}

export function CommuteIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      {/* Red bracket frame */}
      <View style={[styles.bracketTL, { borderColor: '#FF3B30', borderTopWidth: 1.5 * scale, borderLeftWidth: 1.5 * scale, width: 5 * scale, height: 5 * scale, top: -1 * scale, left: -1 * scale, position: 'absolute' }]} />
      <View style={[styles.bracketTR, { borderColor: '#FF3B30', borderTopWidth: 1.5 * scale, borderRightWidth: 1.5 * scale, width: 5 * scale, height: 5 * scale, top: -1 * scale, right: -1 * scale, position: 'absolute' }]} />
      <View style={[styles.bracketBL, { borderColor: '#FF3B30', borderBottomWidth: 1.5 * scale, borderLeftWidth: 1.5 * scale, width: 5 * scale, height: 5 * scale, bottom: -1 * scale, left: -1 * scale, position: 'absolute' }]} />
      <View style={[styles.bracketBR, { borderColor: '#FF3B30', borderBottomWidth: 1.5 * scale, borderRightWidth: 1.5 * scale, width: 5 * scale, height: 5 * scale, bottom: -1 * scale, right: -1 * scale, position: 'absolute' }]} />

      {/* Train front */}
      <View style={[styles.trainFront, { borderColor: color, borderWidth: 2 * scale, width: 14 * scale, height: 16 * scale, borderRadius: 4 * scale, top: 1 * scale, backgroundColor: '#FFFFFF' }]}>
        {/* Windows */}
        <View style={[styles.row, { width: 10 * scale, height: 4 * scale, top: 2 * scale, justifyContent: 'space-between', paddingHorizontal: 1 * scale }]}>
          <View style={{ backgroundColor: color, width: 3.5 * scale, height: 3 * scale, borderRadius: 0.5 * scale }} />
          <View style={{ backgroundColor: color, width: 3.5 * scale, height: 3 * scale, borderRadius: 0.5 * scale }} />
        </View>
        {/* Headlights */}
        <View style={[styles.row, { width: 10 * scale, height: 2 * scale, bottom: -4 * scale, justifyContent: 'space-between', paddingHorizontal: 1.5 * scale }]}>
          <View style={{ backgroundColor: '#FFD60A', width: 2 * scale, height: 2 * scale, borderRadius: 1 * scale }} />
          <View style={{ backgroundColor: '#FFD60A', width: 2 * scale, height: 2 * scale, borderRadius: 1 * scale }} />
        </View>
      </View>
    </View>
  );
}

// Explore Section Icons
export function GInsureIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[styles.shield, { borderColor: color, borderWidth: 2 * scale, width: 18 * scale, height: 20 * scale, borderBottomLeftRadius: 9 * scale, borderBottomRightRadius: 9 * scale, borderTopLeftRadius: 2 * scale, borderTopRightRadius: 2 * scale }]}>
        <Text style={{ fontSize: 8 * scale, color, fontWeight: 'bold', top: 1 * scale, left: 1 * scale }}>🛡️</Text>
      </View>
    </View>
  );
}

export function FoodHubIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>🍔</Text>
    </View>
  );
}

export function TravelIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>✈️</Text>
    </View>
  );
}

export function NearDealsIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>📍</Text>
    </View>
  );
}

export function GForestIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>🌲</Text>
    </View>
  );
}

export function GInvestIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>📈</Text>
    </View>
  );
}

export function GDealsIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>🏷️</Text>
    </View>
  );
}

export function GLifeIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>🛍️</Text>
    </View>
  );
}

export function GCashJrIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>🧒</Text>
    </View>
  );
}

export function ShopIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>🛒</Text>
    </View>
  );
}

export function BorrowLoadIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>📱💸</Text>
    </View>
  );
}

export function BorrowIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>💳</Text>
    </View>
  );
}

export function GLoanIcon({ color = '#007CFF', size = 28 }: IconProps) {
  const scale = size / 28;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Text style={{ fontSize: 18 * scale }}>💰</Text>
    </View>
  );
}

// Eye Icons for Balance toggle
export function EyeIcon({ color = '#FFFFFF', size = 18 }: IconProps) {
  const scale = size / 18;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[styles.eyeLids, { borderColor: color, borderWidth: 1.5 * scale, width: 14 * scale, height: 8 * scale, borderRadius: 4 * scale }]} />
      <View style={[styles.pupil, { backgroundColor: color, width: 4 * scale, height: 4 * scale, borderRadius: 2 * scale }]} />
    </View>
  );
}

export function EyeOffIcon({ color = '#FFFFFF', size = 18 }: IconProps) {
  const scale = size / 18;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={[styles.eyeLids, { borderColor: color, borderWidth: 1.5 * scale, width: 14 * scale, height: 8 * scale, borderRadius: 4 * scale }]} />
      <View style={[styles.pupil, { backgroundColor: color, width: 4 * scale, height: 4 * scale, borderRadius: 2 * scale }]} />
      {/* Crossing line */}
      <View style={[styles.eyeLineSlash, { backgroundColor: color, width: 16 * scale, height: 1.5 * scale, transform: [{ rotate: '45deg' }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gLogoContainer: {
    backgroundColor: '#007CFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  gLogoText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontStyle: 'italic',
  },
  gLogoLine: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },
  roof: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    position: 'absolute',
  },
  houseBody: {
    position: 'absolute',
  },
  envelope: {
    position: 'relative',
    justifyContent: 'flex-start',
  },
  envelopeFlap: {
    position: 'absolute',
    borderStyle: 'solid',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  redBadge: {
    position: 'absolute',
    backgroundColor: '#FF3B30',
  },
  qrCorner: {
    position: 'absolute',
  },
  qrBlock: {
    position: 'absolute',
  },
  qrLine: {
    position: 'absolute',
  },
  paper: {
    position: 'relative',
    alignItems: 'flex-start',
  },
  paperLine: {
    position: 'absolute',
  },
  profileHead: {
    position: 'absolute',
  },
  profileBody: {
    position: 'absolute',
  },
  sendCard: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    position: 'absolute',
  },
  arrowShaft: {
    position: 'absolute',
  },
  phoneFrame: {
    position: 'relative',
  },
  phoneScreenLine: {
    position: 'absolute',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    position: 'relative',
  },
  base: {
    position: 'absolute',
  },
  globalBadge: {
    position: 'absolute',
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  globalText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  checkCircle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  checkmark: {
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
  },
  piggyBody: {
    position: 'relative',
  },
  piggySlot: {
    position: 'absolute',
  },
  piggySnout: {
    position: 'absolute',
  },
  piggyEye: {
    position: 'absolute',
  },
  piggyEar: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    position: 'absolute',
  },
  creditCard: {
    position: 'absolute',
  },
  creditCardActive: {
    position: 'absolute',
  },
  cardStrip: {
    position: 'absolute',
  },
  ticket: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trainFront: {
    position: 'relative',
    alignItems: 'center',
  },
  shield: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeLids: {
    position: 'absolute',
  },
  pupil: {
    position: 'absolute',
  },
  eyeLineSlash: {
    position: 'absolute',
  },
});
