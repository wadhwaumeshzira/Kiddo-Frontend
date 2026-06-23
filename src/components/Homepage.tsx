import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Renderer } from '../renderer/Renderer';
import { SDUINode } from '../types/SDUITypes';
import { useTheme } from '../theme/ThemeContext';
import { useStore } from '../store/useStore';

import { CategoryNav } from './CategoryNav';

export const Homepage = ({ payload }: { payload: SDUINode[] }) => {
  const { theme } = useTheme();
  
  // Perfectly isolated selector: only re-renders the header when total cart items change
  const cartItemCount = useStore(state => Object.values(state.cart).reduce((sum, item) => sum + item.qty, 0));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.secondary }]}>
        <Text style={[styles.headerText, { color: theme.text }]}>Kiddo</Text>
        
        <TouchableOpacity style={styles.cartButton}>
           <Text style={styles.cartIcon}>🛒</Text>
           {cartItemCount > 0 && (
             <View style={[styles.badge, { backgroundColor: theme.primary }]}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
             </View>
           )}
        </TouchableOpacity>
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
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Baloo 2',
    fontWeight: 'bold',
  },
  cartButton: {
    position: 'absolute',
    right: 24,
    top: 16,
  },
  cartIcon: {
    fontSize: 30,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF8F0',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
