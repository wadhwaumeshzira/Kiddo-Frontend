import React from 'react';
import { ComponentType } from '../types/SDUITypes';

type ComponentMap = Record<string, React.ComponentType<any>>;

// O(1) hash map registry, avoiding slow switch/if-else chains
export const ComponentRegistry: ComponentMap = {
  // Components will be registered here, e.g.:
  // 'BANNER_HERO': BannerHero,
};

export const registerComponent = (type: string, component: React.ComponentType<any>) => {
  if (ComponentRegistry[type]) {
    console.warn(`[SDUI Registry] Overriding existing component for type: ${type}`);
  }
  ComponentRegistry[type] = component;
};

export const getComponent = (type: string): React.ComponentType<any> | null => {
  return ComponentRegistry[type] || null;
};
