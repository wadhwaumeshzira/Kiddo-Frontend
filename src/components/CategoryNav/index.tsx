import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { BounceButton } from '../BounceButton';

const iconBear = require('../../../assets/illustrations/bear.png');
const iconOnesie = require('../../../assets/illustrations/onesie.png');
const iconStroller = require('../../../assets/illustrations/stroller.png');
const iconBottle = require('../../../assets/illustrations/bottle.png');

const CATEGORIES = [
  { name: "ALL ⌄", icon: iconBear }, 
  { name: "BOY", icon: iconOnesie }, 
  { name: "GIRL", icon: iconOnesie }, 
  { name: "SHOES", icon: iconStroller }, 
  { name: "TOYS", icon: iconBear }, 
  { name: "DIAPERS", icon: iconBottle }, 
  { name: "GEAR", icon: iconStroller }, 
  { name: "FEEDING", icon: iconBottle }, 
  { name: "BATH", icon: iconBottle }, 
  { name: "NURSERY", icon: iconBear }, 
  { name: "MOMS", icon: iconOnesie }, 
  { name: "HEALTH", icon: iconBottle }, 
  { name: "SHOP", icon: iconStroller }
];

export const CategoryNav = React.memo(() => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={92} // Width (60) + MarginHorizontal (32)
        decelerationRate="fast"
      >
        {CATEGORIES.map((cat, index) => (
          <BounceButton key={index} style={styles.catItem}>
            <View style={styles.iconCircle}>
              <Image source={cat.icon} style={styles.iconImage} />
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
    paddingVertical: 10, // Optimized padding!
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
    marginHorizontal: 16,
    alignItems: 'center',
    width: 60,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25, 
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  iconImage: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  catText: {
    fontFamily: 'Fredoka-Bold', 
    fontSize: 10,
    color: '#4A4A4A',
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});
