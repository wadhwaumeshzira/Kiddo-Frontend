import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Renderer } from '../renderer/Renderer';
import { SDUINode } from '../types/SDUITypes';
import { useTheme } from '../theme/ThemeContext';
import { useStore } from '../store/useStore';
import { CategoryNav } from './CategoryNav';
import { BounceButton } from './BounceButton';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withSpring } from 'react-native-reanimated';
import { CartDrawer } from './CartDrawer';

// Custom Cart Badge to isolate pop animation
const CartBadge = ({ count, theme }: { count: number, theme: any }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (count > 0) {
      scale.value = withSequence(
        withSpring(1.5, { damping: 10 }),
        withSpring(1, { damping: 12 })
      );
    }
  }, [count]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  if (count === 0) return null;

  return (
    <Animated.View style={[styles.badge, style, { backgroundColor: theme.primary }]}>
      <Text style={styles.badgeText}>{count}</Text>
    </Animated.View>
  );
};

export const Homepage = ({ payload }: { payload: SDUINode[] }) => {
  const { theme } = useTheme();
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const cartItemCount = useStore(state => Object.values(state.cart).reduce((sum, item) => sum + item.qty, 0));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.secondary }]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.headerLetter, { color: '#FF6B6B', transform: [{ rotate: '-4deg' }], marginLeft: 8 }]}>K</Text>
          <Text style={[styles.headerLetter, { color: '#4ECDC4', transform: [{ rotate: '3deg' }, { translateY: -2 }] }]}>i</Text>
          <Text style={[styles.headerLetter, { color: '#F4D03F', transform: [{ rotate: '-2deg' }] }]}>d</Text>
          <Text style={[styles.headerLetter, { color: '#FF9F1C', transform: [{ rotate: '4deg' }, { translateY: 2 }] }]}>d</Text>
          <Text style={[styles.headerLetter, { color: '#A593E0', transform: [{ rotate: '-3deg' }], marginRight: 4 }]}>o</Text>
          <Text style={styles.titleIcon}>✨</Text>
        </View>
        
        <BounceButton style={styles.cartButton} onPress={() => setIsCartOpen(true)}>
           <Text style={styles.cartIcon}>🛒</Text>
           <Text style={styles.cartText}>Cart</Text>
           <CartBadge count={cartItemCount} theme={theme} />
        </BounceButton>
      </View>
      <CategoryNav />
      <View style={{ flex: 1, width: '100%' }}>
        <FlashList
          data={payload}
          keyExtractor={(item: SDUINode) => item.id}
          getItemType={(item: SDUINode) => item.type}
          estimatedItemSize={200}
          removeClippedSubviews={true}
          renderItem={({ item }) => (
            <View style={{ width: '100%', maxWidth: 1200, alignSelf: 'center' }}>
              <Renderer nodes={[item]} />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#fff',
    elevation: 6,
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    zIndex: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  headerLetter: {
    fontSize: 48,
    fontFamily: 'Baloo 2-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.08)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    letterSpacing: -1,
    marginHorizontal: 0.5,
  },
  titleIcon: {
    fontSize: 26,
    marginLeft: 6,
    transform: [{ translateY: -12 }],
    textShadowColor: 'rgba(244, 208, 63, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  decorIcon: {
    fontSize: 18,
    marginHorizontal: 1,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cartButton: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFE08A',
    shadowColor: '#D97706',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  cartIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  cartText: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 16,
    color: '#FF6B6B',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Fredoka-Bold',
  }
});
