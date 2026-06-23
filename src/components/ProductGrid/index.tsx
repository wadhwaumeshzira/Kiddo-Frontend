import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, { FadeInUp, useSharedValue, useAnimatedStyle, withSequence, withSpring } from 'react-native-reanimated';
import { ProductGridNode } from '../../types/SDUITypes';
import { useTheme } from '../../theme/ThemeContext';
import { useStore } from '../../store/useStore';
import { handleAction } from '../../actions/dispatcher';
import { MockProducts } from '../../../mocks/products';
import { BounceButton } from '../BounceButton';

// Simple Reanimated Confetti
const ConfettiDot = () => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    translateY.value = withSequence(
      withSpring(-60 - Math.random() * 60, { damping: 12 }),
      withSpring(40, { damping: 15 })
    );
    translateX.value = withSpring((Math.random() - 0.5) * 120);
    opacity.value = withSequence(withSpring(1), withSpring(0, { damping: 20 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const colors = ['#FF6B6B', '#FDE02F', '#32D74B', '#4DA8DA', '#FF9F1C'];
  return <Animated.View style={[styles.confettiDot, style, { backgroundColor: colors[Math.floor(Math.random() * colors.length)] }]} />;
};

const ProductCard = React.memo(({ productId, index }: { productId: string, index: number }) => {
  const { theme } = useTheme();
  const qty = useStore((state) => state.cart[productId]?.qty || 0);
  const product = MockProducts[productId] || MockProducts['p1'];
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAdd = () => {
    setShowConfetti(true);
    handleAction({ type: 'ADD_TO_CART', productId });
    setTimeout(() => setShowConfetti(false), 800);
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(index * 100).duration(500).springify()}
      style={[styles.card, { backgroundColor: theme.card }]}
    >
      {product.isBestseller && (
        <View style={styles.bestsellerBadge}>
          <Text style={styles.badgeText}>Bestseller</Text>
        </View>
      )}
      {product.discountBadge && (
        <View style={styles.discountBadge}>
          <Text style={styles.badgeText}>{product.discountBadge}</Text>
        </View>
      )}
      <Image source={product.image} style={styles.productImage} resizeMode="contain" />
      <View style={styles.infoContainer}>
         <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{product.name}</Text>
         <View style={styles.priceRow}>
           <Text style={[styles.price, { color: theme.primary }]}>${product.price.toFixed(2)}</Text>
           {product.originalPrice && (
             <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
           )}
         </View>
      </View>
      
      <View style={{ width: '100%', alignItems: 'center' }}>
        {showConfetti && (
          <View style={styles.confettiContainer} pointerEvents="none">
             {[...Array(12)].map((_, i) => <ConfettiDot key={i} />)}
          </View>
        )}
        <BounceButton 
          style={[styles.addButton, { backgroundColor: theme.primary }]}
          onPress={handleAdd}
        >
          <Text style={styles.addText}>{qty > 0 ? `In Cart (${qty})` : '+ Add to Cart'}</Text>
        </BounceButton>
      </View>
    </Animated.View>
  );
});

export const ProductGrid = React.memo((props: ProductGridNode['props']) => {
  return (
    <View style={styles.grid}>
      {props.productIds.map((id, index) => (
        <ProductCard key={id} productId={id} index={index} />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center', // Centers cards elegantly when wrapping
  },
  card: {
    flexGrow: 1, // Fixes responsiveness!
    flexBasis: 160, 
    minWidth: 150,
    maxWidth: 350, // Prevents a single card from stretching 100% horizontally
    margin: 8,
    padding: 16,
    alignItems: 'center',
    borderRadius: 24, 
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  bestsellerBadge: {
    position: 'absolute',
    top: -5,
    left: -5,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
    transform: [{ rotate: '-4deg' }],
  },
  discountBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#32D74B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontFamily: 'Fredoka-Bold',
    fontSize: 11,
  },
  productImage: {
    width: '100%',
    height: 140,
    marginBottom: 12,
    borderRadius: 16,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 17,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontFamily: 'Baloo 2-Bold',
    fontSize: 22,
  },
  originalPrice: {
    fontFamily: 'Quicksand',
    fontSize: 14,
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    borderRadius: 24,
  },
  addText: {
    fontFamily: 'Fredoka-Bold',
    color: '#fff',
    fontSize: 16,
  },
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: '50%',
    zIndex: 50,
  },
  confettiDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  }
});
