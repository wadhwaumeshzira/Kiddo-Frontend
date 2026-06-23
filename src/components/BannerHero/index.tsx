import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BannerHeroNode } from '../../types/SDUITypes';
import { handleAction } from '../../actions/dispatcher';
import { useTheme } from '../../theme/ThemeContext';

export const BannerHero = React.memo((props: BannerHeroNode['props']) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => handleAction(props.action)}
      style={[styles.container, { backgroundColor: theme.card, borderRadius: theme.radius.md, shadowColor: theme.shadow }]}
    >
      <Image 
        source={{ uri: props.imageUrl }} 
        style={[styles.image, { borderRadius: theme.radius.md }]} 
        resizeMode="contain" 
      />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    height: 250,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
