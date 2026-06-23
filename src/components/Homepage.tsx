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
  
  const cartItemCount = useStore(state => Object.values(state.cart).reduce((sum, item) => sum + item.qty, 0));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.secondary }]}>
        <Text style={styles.headerText}>Kiddo</Text>
        
        <BounceButton style={styles.cartButton}>
           <Text style={styles.cartIcon}>🛒</Text>
           <CartBadge count={cartItemCount} theme={theme} />
           <Text style={styles.mascot}>🐻</Text>
        </BounceButton>
      </View>
      <CategoryNav />
      <View style={{ flex: 1, width: '100%', maxWidth: 1200, alignSelf: 'center' }}>
        <FlashList
          data={payload}
          keyExtractor={(item: SDUINode) => item.id}
          getItemType={(item: SDUINode) => item.type}
          estimatedItemSize={200}
          removeClippedSubviews={true}
          renderItem={({ item }) => <Renderer nodes={[item]} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    zIndex: 10,
  },
  headerText: {
    fontSize: 36,
    fontFamily: 'Baloo 2-Bold',
    color: '#FF6B6B',
  },
  cartButton: {
    position: 'absolute',
    right: 24,
    top: 14,
  },
  cartIcon: {
    fontSize: 28,
  },
  mascot: {
    position: 'absolute',
    top: -10,
    left: -14,
    fontSize: 18,
    transform: [{ rotate: '-15deg' }],
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
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
