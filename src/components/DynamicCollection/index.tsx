import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { DynamicCollectionNode } from '../../types/SDUITypes';
import { useTheme } from '../../theme/ThemeContext';
import { Renderer } from '../../renderer/Renderer';

export const DynamicCollection = React.memo((props: DynamicCollectionNode['props'] & { children?: any }) => {
  const { theme } = useTheme();
  
  if (!props.children || props.children.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{props.title}</Text>
      <View style={{ height: 200, width: '100%' }}>
        <FlashList
          data={props.children}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item.id}
          estimatedItemSize={300}
          renderItem={({ item }) => (
            <View style={{ width: 300, marginRight: 16 }}>
               <Renderer nodes={[item]} />
            </View>
          )}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingLeft: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'Baloo 2',
  }
});
