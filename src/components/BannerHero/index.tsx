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
      style={[
        styles.container, 
        props.fullWidth ? styles.fullWidthContainer : { backgroundColor: theme.card, borderRadius: theme.radius.md, shadowColor: theme.shadow }
      ]}
    >
      <Image 
        source={typeof props.imageUrl === 'string' && props.imageUrl.startsWith('http') ? { uri: props.imageUrl } : props.imageUrl} 
        style={[styles.image, props.fullWidth ? {} : { borderRadius: theme.radius.md }]} 
        resizeMode={props.fullWidth ? "cover" : "contain"} 
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
    elevation: 6,
  },
  fullWidthContainer: {
    width: '100%',
    height: 380,
    marginHorizontal: 0,
    marginVertical: 0,
    marginBottom: 20,
    shadowOpacity: 0,
    elevation: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
