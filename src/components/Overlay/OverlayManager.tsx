import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { FullScreenOverlayNode } from '../../types/SDUITypes';

// Simulated event emitter for overlays without prop drilling
export const triggerOverlay = (overlay: FullScreenOverlayNode) => {
  // In React Native, window events don't exist exactly like web, but we can use a basic observable/emitter
  // We'll use a simple callback for the sake of this prototype.
  if (globalOverlayCallback) {
    globalOverlayCallback(overlay);
  }
};

let globalOverlayCallback: ((o: FullScreenOverlayNode | null) => void) | null = null;

export const OverlayManager = () => {
  const [activeOverlay, setActiveOverlay] = useState<FullScreenOverlayNode | null>(null);

  useEffect(() => {
    globalOverlayCallback = (overlay) => {
      setActiveOverlay(overlay);
      if (overlay) {
        setTimeout(() => setActiveOverlay(null), 3500); // Auto dismiss
      }
    };
    return () => { globalOverlayCallback = null; };
  }, []);

  if (!activeOverlay) return null;

  return (
    <View style={styles.overlayContainer} pointerEvents="none">
      <LottieView
        source={{ uri: activeOverlay.props.animationUrl }}
        autoPlay
        loop={false}
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999, // Render above UI
    elevation: 9999,
  },
  lottie: {
    width: '100%',
    height: '100%',
  }
});
