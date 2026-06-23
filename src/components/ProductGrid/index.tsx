import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ProductGridNode } from '../../types/SDUITypes';
import { useTheme } from '../../theme/ThemeContext';
import { useStore } from '../../store/useStore';
import { handleAction } from '../../actions/dispatcher';
import { MockProducts } from '../../../mocks/products';
import { BounceButton } from '../BounceButton';

const ProductCard = React.memo(({ productId }: { productId: string }) => {
  const { theme } = useTheme();
  const qty = useStore((state) => state.cart[productId]?.qty || 0);
  const product = MockProducts[productId] || MockProducts['p1'];

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
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
      
      <BounceButton 
        style={[styles.addButton, { backgroundColor: theme.primary }]}
        onPress={() => handleAction({ type: 'ADD_TO_CART', productId })}
      >
        <Text style={styles.addText}>{qty > 0 ? `In Cart (${qty})` : '+ Add to Cart'}</Text>
      </BounceButton>
    </View>
  );
});

export const ProductGrid = React.memo((props: ProductGridNode['props']) => {
  return (
    <View style={styles.grid}>
      {props.productIds.map(id => (
        <ProductCard key={id} productId={id} />
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
  },
  card: {
    width: '46%',
    margin: '2%',
    padding: 16,
    alignItems: 'center',
    borderRadius: 24, // Section 10 standard
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
  }
});
