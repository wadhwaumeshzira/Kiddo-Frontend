import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Renderer } from '../../renderer/Renderer';
import { DynamicCollectionNode } from '../../types/SDUITypes';
import { useTheme } from '../../theme/ThemeContext';
import Animated, { FadeInUp } from 'react-native-reanimated';

export const DynamicCollection = React.memo((props: DynamicCollectionNode['props']) => {
  const { theme } = useTheme();

  if (!props.children || props.children.length === 0) return null;

  return (
    <Animated.View entering={FadeInUp.duration(500).springify()} style={[styles.container, { maxWidth: 1200, alignSelf: 'center', width: '100%' }]}>
      <Text style={[styles.title, { color: theme.text }]}>{props.title}</Text>
      <View style={{ height: 280, width: '100%', overflow: 'hidden' }}>
        <FlashList
          data={props.children}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item.id}
          estimatedItemSize={320}
          renderItem={({ item }) => (
            <View style={{ width: 320, marginRight: 20 }}>
               <Renderer nodes={[item]} />
            </View>
          )}
        />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    overflow: 'hidden', // Prevents any horizontal leakage
  },
  title: {
    fontSize: 26,
    fontFamily: 'Baloo 2-Bold',
    marginLeft: 16,
    marginBottom: 16,
  }
});
