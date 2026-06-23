import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ProductGridNode } from '../../types/SDUITypes';
import { useTheme } from '../../theme/ThemeContext';
import { useStore } from '../../store/useStore';
import { handleAction } from '../../actions/dispatcher';

const ProductCard = React.memo(({ productId }: { productId: string }) => {
  const { theme } = useTheme();
  // Perfect isolation: only re-renders if THIS specific product's qty changes
  const qty = useStore((state) => state.cart[productId]?.qty || 0);

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderRadius: theme.radius.sm, shadowColor: theme.shadow }]}>
      <View style={[styles.imagePlaceholder, { backgroundColor: theme.secondary, borderRadius: theme.radius.sm }]} />
      <Text style={[styles.title, { color: theme.text }]}>Product {productId}</Text>
      
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
  },
  card: {
    width: '45%',
    margin: '2.5%',
    padding: 12,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  addText: {
    fontWeight: 'bold',
    color: '#333',
  }
});
