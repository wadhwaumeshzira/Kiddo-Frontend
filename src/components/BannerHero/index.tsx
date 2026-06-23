import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { BannerHeroNode } from '../../types/SDUITypes';
import { useTheme } from '../../theme/ThemeContext';
import { handleAction } from '../../actions/dispatcher';
import { BounceButton } from '../BounceButton';

export const BannerHero = React.memo((props: BannerHeroNode['props']) => {
  const { theme } = useTheme();

  return (
    <BounceButton 
      onPress={() => handleAction(props.action)}
      style={[
        styles.container, 
        props.fullWidth ? styles.fullWidthContainer : { backgroundColor: theme.card }
      ]}
    >
      <Image 
        source={typeof props.imageUrl === 'string' && props.imageUrl.startsWith('http') ? { uri: props.imageUrl } : props.imageUrl} 
        style={[styles.image, props.fullWidth ? {} : { borderRadius: 24 }]} 
        resizeMode={props.fullWidth ? "cover" : "contain"} 
      />
    </BounceButton>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    height: 250,
    borderRadius: 24, // Section 10 standard
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.1, // Soft deep shadow
    shadowRadius: 24,
    elevation: 8,
  },
  fullWidthContainer: {
    width: '100%',
    height: 380,
    marginHorizontal: 0,
    marginVertical: 0,
    marginBottom: 24,
    borderRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});
