import React, { useEffect } from 'react';
import { View } from 'react-native';

interface UnknownComponentProps {
  type: string;
}

export const UnknownComponent = React.memo(({ type }: UnknownComponentProps) => {
  useEffect(() => {
    // Log exactly once per unknown component type mount
    console.warn(`[SDUI Registry] Unknown component type requested: ${type}. Safely ignoring without crashing.`);
  }, [type]);

  // Renders nothing visible to ensure the layout doesn't break
  return <View style={{ display: 'none' }} />;
});
