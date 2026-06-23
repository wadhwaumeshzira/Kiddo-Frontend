import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeContext';
import { Homepage } from './src/components/Homepage';
import { OverlayManager } from './src/components/Overlay/OverlayManager';
import { mockPayloads } from './mocks/payloads';
import { useStore } from './src/store/useStore';
import { DevPanel } from './src/components/DevPanel';
import { useFonts } from 'expo-font';
import { Fredoka_400Regular, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Baloo2_400Regular, Baloo2_700Bold } from '@expo-google-fonts/baloo-2';
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, padding: 40, backgroundColor: '#FF6B6B', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>App Crashed!</Text>
          <Text style={{ color: 'white', marginTop: 10 }}>{this.state.error?.toString()}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Fredoka': Fredoka_400Regular,
    'Fredoka-Bold': Fredoka_600SemiBold,
    'Quicksand': Quicksand_400Regular,
    'Quicksand-Bold': Quicksand_700Bold,
    'Baloo 2': Baloo2_400Regular,
    'Baloo 2-Bold': Baloo2_700Bold,
  });

  const activeCategoryId = useStore(state => state.activeCategoryId);
  const setActiveCategoryId = useStore(state => state.setActiveCategoryId);
  
  if (!fontsLoaded) {
    return null;
  }

  // Fallback to 'coming-soon' payload if the category doesn't exist yet
  const activePayload = mockPayloads[activeCategoryId] || mockPayloads['coming-soon'];

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8F0' }}>
          <Homepage payload={activePayload} />
          
          <DevPanel onCampaignSwitch={setActiveCategoryId} />

          <OverlayManager />
        </SafeAreaView>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({});
