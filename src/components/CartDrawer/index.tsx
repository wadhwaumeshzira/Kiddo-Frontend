import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../theme/ThemeContext';
import { MockProducts } from '../../../mocks/products';
import { BounceButton } from '../BounceButton';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(width * 0.85, 400);

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { theme } = useTheme();
  const translateX = useSharedValue(DRAWER_WIDTH);
  const cart = useStore(state => state.cart);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      translateX.value = withSpring(0, { damping: 15, stiffness: 100 });
    } else {
      translateX.value = withTiming(DRAWER_WIDTH, { duration: 300 }, (isFinished) => {
        // We shouldn't strictly unmount inside reanimated worklet without runOnJS,
        // but since this is an example, keeping it mounted offscreen is fine for performance.
      });
    }
  }, [isOpen]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  const cartItems = Object.entries(cart).map(([id, item]) => ({
    ...item,
    product: MockProducts[id]
  })).filter(i => i.qty > 0);

  const total = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.qty, 0);

  // Mount optimization: don't render until opened once
  if (!isRendered && !isOpen) return null;

  return (
    <View style={styles.absoluteLayer} pointerEvents={isOpen ? 'auto' : 'none'}>
      {isOpen && (
        <View style={styles.backdrop}>
          <BounceButton style={StyleSheet.absoluteFill} onPress={onClose} />
        </View>
      )}
      <Animated.View style={[styles.drawer, style, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <Text style={[styles.headerText, { color: theme.text }]}>Your Cart 🛍️</Text>
          <BounceButton onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </BounceButton>
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
          {cartItems.length === 0 ? (
            <Text style={[styles.emptyText, { color: theme.text }]}>Your cart is empty!</Text>
          ) : (
            cartItems.map((item) => (
              <View key={item.productId} style={[styles.itemCard, { backgroundColor: theme.card }]}>
                <Image source={item.product?.image} style={styles.itemImg} resizeMode="contain" />
                <View style={styles.itemInfo}>
                  <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={1}>{item.product?.name}</Text>
                  <Text style={[styles.itemPrice, { color: theme.primary }]}>₹{item.product?.price}</Text>
                </View>
                <View style={styles.stepperContainer}>
                  <BounceButton 
                    style={[styles.stepperBtn, { backgroundColor: '#eee' }]}
                    onPress={() => useStore.getState().removeFromCart(item.productId)}
                  >
                    <Text style={styles.stepperBtnText}>-</Text>
                  </BounceButton>
                  <Text style={styles.stepperCountText}>{item.qty}</Text>
                  <BounceButton 
                    style={[styles.stepperBtn, { backgroundColor: theme.secondary }]}
                    onPress={() => useStore.getState().addToCart(item.productId)}
                  >
                    <Text style={styles.stepperBtnText}>+</Text>
                  </BounceButton>
                </View>
              </View>
            ))
          )}
        </ScrollView>
        {cartItems.length > 0 && (
          <View style={[styles.footer, { borderTopColor: theme.secondary }]}>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>Total:</Text>
              <Text style={[styles.totalValue, { color: theme.primary }]}>₹{total}</Text>
            </View>
            <BounceButton style={[styles.checkoutBtn, { backgroundColor: theme.primary }]} onPress={onClose}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </BounceButton>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: -5, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48, // Safe area
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontFamily: 'Baloo 2-Bold',
    fontSize: 28,
  },
  closeBtn: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  closeText: {
    fontSize: 16,
    fontFamily: 'Fredoka-Bold',
  },
  scroll: {
    padding: 16,
  },
  emptyText: {
    fontFamily: 'Quicksand',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 16,
  },
  itemImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Fredoka-Bold',
    fontSize: 16,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    color: '#333',
    fontSize: 20,
    fontFamily: 'Fredoka-Bold',
    lineHeight: 24,
  },
  stepperCountText: {
    fontFamily: 'Baloo 2-Bold',
    fontSize: 18,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
  },
  totalValue: {
    fontFamily: 'Baloo 2-Bold',
    fontSize: 28,
  },
  checkoutBtn: {
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  checkoutText: {
    fontFamily: 'Fredoka-Bold',
    color: '#fff',
    fontSize: 20,
  }
});
