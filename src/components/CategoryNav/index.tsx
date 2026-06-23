import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { BounceButton } from '../BounceButton';

import { useStore } from '../../store/useStore';

const iconBear = require('../../../assets/illustrations/bear.png');
const iconOnesie = require('../../../assets/illustrations/onesie.png');
const iconStroller = require('../../../assets/illustrations/stroller.png');
const iconBottle = require('../../../assets/illustrations/bottle.png');
const iconBoy = require('../../../assets/illustrations/boy.png');
const iconGirl = require('../../../assets/illustrations/girl.png');
const iconShoe = require('../../../assets/illustrations/shoe.png');
const iconBath = require('../../../assets/illustrations/bath.png');
const iconBed = require('../../../assets/illustrations/bed.png');
const iconMom = require('../../../assets/illustrations/mom.png');
const iconHealth = require('../../../assets/illustrations/health.png');
const iconShop = require('../../../assets/illustrations/shop.png');

const CATEGORIES = [
  { id: 'all', name: "ALL ⌄", icon: iconBear }, 
  { id: 'boy', name: "BOY", icon: iconBoy }, 
  { id: 'girl', name: "GIRL", icon: iconGirl }, 
  { id: 'shoes', name: "SHOES", icon: iconShoe }, 
  { id: 'toys', name: "TOYS", icon: iconBear }, 
  { id: 'diapers', name: "DIAPERS", icon: require('../../../assets/illustrations/wipes.png') }, 
  { id: 'gear', name: "GEAR", icon: iconStroller }, 
  { id: 'feeding', name: "FEEDING", icon: iconBottle }, 
  { id: 'bath', name: "BATH", icon: iconBath }, 
  { id: 'nursery', name: "NURSERY", icon: iconBed }, 
  { id: 'moms', name: "MOMS", icon: iconMom }, 
  { id: 'health', name: "HEALTH", icon: iconHealth }, 
  { id: 'shop', name: "SHOP", icon: iconShop }
];

export const CategoryNav = React.memo(() => {
  const activeCategoryId = useStore(state => state.activeCategoryId);
  const setActiveCategoryId = useStore(state => state.setActiveCategoryId);

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={108} 
        decelerationRate="fast"
      >
        {CATEGORIES.map((cat, index) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <BounceButton 
              key={index} 
              style={styles.catItem}
              onPress={() => setActiveCategoryId(cat.id)}
            >
              <View style={[styles.iconCircle, isActive && styles.iconCircleActive]}>
                <Image source={cat.icon} style={styles.iconImage} />
              </View>
              <Text style={[styles.catText, isActive && styles.catTextActive]}>{cat.name}</Text>
            </BounceButton>
          );
        })}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEB3B', // Brighter, cleaner yellow
    width: '100%',
    paddingVertical: 14, 
    borderBottomWidth: 3,
    borderBottomColor: '#FDD835',
    elevation: 8,
    shadowColor: '#D97706',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    zIndex: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  catItem: {
    marginHorizontal: 24, // Increased from 16 to 24
    alignItems: 'center',
    width: 60,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 20, // Squircle!
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FFFDE7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  iconImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  iconCircleActive: {
    backgroundColor: '#FFF8F0',
    borderColor: '#D97706',
    borderWidth: 3,
  },
  catText: {
    fontFamily: 'Fredoka-Bold', 
    fontSize: 11,
    color: '#D97706', // Amber text instead of harsh grey
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  catTextActive: {
    color: '#B45309', // Darker amber for active state
    fontSize: 12,
  }
});
