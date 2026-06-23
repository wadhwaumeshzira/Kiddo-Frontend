import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeContext';
import { Homepage } from './src/components/Homepage';
import { OverlayManager } from './src/components/Overlay/OverlayManager';
import { mockPayloads } from './mocks/payloads';
import { DevPanel } from './src/components/DevPanel';
import { useFonts } from 'expo-font';
import { Fredoka_400Regular, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Baloo2_400Regular, Baloo2_700Bold } from '@expo-google-fonts/baloo-2';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Fredoka': Fredoka_400Regular,
    'Fredoka-Bold': Fredoka_600SemiBold,
    'Quicksand': Quicksand_400Regular,
    'Quicksand-Bold': Quicksand_700Bold,
    'Baloo 2': Baloo2_400Regular,
    'Baloo 2-Bold': Baloo2_700Bold,
  });

  const [activeCampaignId, setActiveCampaignId] = useState('back-to-school');
  
  if (!fontsLoaded) {
    return null;
  }

  const activePayload = mockPayloads[activeCampaignId];

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8F0' }}>
        <Homepage payload={activePayload} />
        
        <DevPanel onCampaignSwitch={setActiveCampaignId} />

        <OverlayManager />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});
