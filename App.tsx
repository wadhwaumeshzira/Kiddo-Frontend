import React, { useState } from 'react';
import { View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { ThemeProvider } from './src/theme/ThemeContext';
import { Homepage } from './src/components/Homepage';
import { OverlayManager } from './src/components/Overlay/OverlayManager';
import { mockPayloads } from './mocks/payloads';

export default function App() {
  const [activeCampaignId, setActiveCampaignId] = useState('back-to-school');
  
  const activePayload = mockPayloads[activeCampaignId];

  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8F0' }}>
        <Homepage payload={activePayload} />
        
        {/* Simple Campaign Switcher to prove OTA resilience and no remounting */}
        <View style={styles.switcher}>
          <Button 
            title="School" 
            onPress={() => setActiveCampaignId('back-to-school')} 
          />
          <Button 
            title="Carnival" 
            onPress={() => setActiveCampaignId('mystery-carnival')} 
          />
        </View>

        <OverlayManager />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  switcher: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  }
});
