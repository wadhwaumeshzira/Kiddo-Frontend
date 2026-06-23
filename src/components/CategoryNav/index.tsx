import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BounceButton } from '../BounceButton';

const CATEGORIES = [
  { name: "ALL ⌄", icon: "🌟" }, 
  { name: "BOY", icon: "👦" }, 
  { name: "GIRL", icon: "👧" }, 
  { name: "SHOES", icon: "👟" }, 
  { name: "TOYS", icon: "🧸" }, 
  { name: "DIAPERS", icon: "🍼" }, 
  { name: "GEAR", icon: "🚲" }, 
  { name: "FEEDING", icon: "🥣" }, 
  { name: "BATH", icon: "🛁" }, 
  { name: "NURSERY", icon: "🛏️" }, 
  { name: "MOMS", icon: "👩" }, 
  { name: "HEALTH", icon: "⚕️" }, 
  { name: "SHOP", icon: "🛍️" }
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
          <BounceButton key={index} style={styles.catItem}>
            <View style={styles.iconCircle}>
              <Text style={styles.icon}>{cat.icon}</Text>
            </View>
            <Text style={styles.catText}>{cat.name}</Text>
          </BounceButton>
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDE02F',
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 4,
    borderBottomColor: '#E5C912',
    elevation: 4,
    zIndex: 5,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  catItem: {
    marginRight: 18,
    alignItems: 'center',
    width: 60,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27, // Fully rounded
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    fontSize: 26,
  },
  catText: {
    fontFamily: 'Fredoka-Bold', // Custom font applied
    fontSize: 10,
    color: '#4A4A4A',
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});
