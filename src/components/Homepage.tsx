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
        <Text style={styles.headerText}>Kiddo</Text>
        
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
  headerText: {
    fontSize: 42,
    fontFamily: 'Baloo 2-Bold',
    color: '#FF6B6B',
    textShadowColor: 'rgba(255, 107, 107, 0.15)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
    letterSpacing: 1,
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
