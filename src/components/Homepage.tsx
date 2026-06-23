import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Renderer } from '../renderer/Renderer';
import { SDUINode } from '../types/SDUITypes';
import { useTheme } from '../theme/ThemeContext';

export const Homepage = ({ payload }: { payload: SDUINode[] }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.secondary }]}>
        <Text style={[styles.headerText, { color: theme.text }]}>Kiddo</Text>
      </View>
      <FlashList
        data={payload}
        keyExtractor={(item: SDUINode) => item.id}
        // getItemType prevents recycling views of different types, crucial for SDUI performance
        getItemType={(item: SDUINode) => item.type}
        estimatedItemSize={200}
        removeClippedSubviews={true}
        renderItem={({ item }) => <Renderer nodes={[item]} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Baloo 2',
    fontWeight: 'bold',
  }
});
