import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ProductGridNode } from '../../types/SDUITypes';
import { useTheme } from '../../theme/ThemeContext';
import { useStore } from '../../store/useStore';
import { handleAction } from '../../actions/dispatcher';
import { MockProducts } from '../../../mocks/products';

const ProductCard = React.memo(({ productId }: { productId: string }) => {
  const { theme } = useTheme();
  // Perfect isolation: only re-renders if THIS specific product's qty changes
  const qty = useStore((state) => state.cart[productId]?.qty || 0);
  const product = MockProducts[productId] || MockProducts['p1'];

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderRadius: theme.radius.md, shadowColor: theme.shadow }]}>
      <Image source={product.image} style={[styles.productImage, { borderRadius: theme.radius.sm }]} resizeMode="cover" />
      <View style={styles.infoContainer}>
         <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{product.name}</Text>
         <Text style={[styles.price, { color: theme.primary }]}>${product.price.toFixed(2)}</Text>
      </View>
      
      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: theme.primary, borderRadius: theme.radius.round }]}
        onPress={() => handleAction({ type: 'ADD_TO_CART', productId })}
      >
        <Text style={styles.addText}>{qty > 0 ? `In Cart (${qty})` : '+ Add'}</Text>
      </TouchableOpacity>
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
    width: '45%',
    margin: '2.5%',
    padding: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  productImage: {
    width: '100%',
    height: 140,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontFamily: 'Baloo 2',
    fontWeight: 'bold',
    fontSize: 18,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  addText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
  }
});
