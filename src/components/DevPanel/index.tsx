import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

export const DevPanel = ({ onCampaignSwitch }: { onCampaignSwitch: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      // Hidden trigger: Long press the bottom right corner of the screen to open Dev Panel
      <TouchableOpacity style={styles.hiddenTrigger} onLongPress={() => setIsOpen(true)} delayLongPress={800} />
    );
  }

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Dev Performance Panel (Sec 12)</Text>
      <View style={styles.row}>
        <Button title="Load School Campaign" onPress={() => onCampaignSwitch('back-to-school')} color="#FDE02F" />
        <Button title="Load Carnival Campaign" onPress={() => onCampaignSwitch('mystery-carnival')} color="#FF6B6B" />
      </View>
      <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeBtn}>
        <Text style={styles.closeText}>Hide Panel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hiddenTrigger: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    zIndex: 9999,
  },
  panel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#2A2A2A',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 9999,
  },
  title: {
    color: '#fff',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  closeBtn: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  closeText: {
    color: '#aaa',
    fontFamily: 'Fredoka',
  }
});
