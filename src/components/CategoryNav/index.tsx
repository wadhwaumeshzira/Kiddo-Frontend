import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const CATEGORIES = [
  "ALL CATEGORIES ⌄", "BOY FASHION", "GIRL FASHION", "FOOTWEAR", "TOYS", 
  "DIAPERING", "GEAR", "FEEDING", "BATH", "NURSERY", "MOMS", "HEALTH", "BOUTIQUES"
];

export const CategoryNav = React.memo(() => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.catItem}>
            <Text style={styles.catText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDE02F', // Official bright yellow
    width: '100%',
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  catItem: {
    marginRight: 24,
  },
  catText: {
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    fontSize: 13,
    color: '#333',
    letterSpacing: 0.5,
  }
});
