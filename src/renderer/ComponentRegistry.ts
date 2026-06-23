import React from 'react';
import { ComponentType } from '../types/SDUITypes';
import { BannerHero } from '../components/BannerHero';
import { ProductGrid, ProductCard } from '../components/ProductGrid';
import { DynamicCollection } from '../components/DynamicCollection';

type ComponentMap = Record<string, React.ComponentType<any>>;

// O(1) hash map registry, avoiding slow switch/if-else chains
export const ComponentRegistry: ComponentMap = {
  'BANNER_HERO': BannerHero,
  'PRODUCT_GRID_2X2': ProductGrid,
  'PRODUCT_CARD': ProductCard,
  'DYNAMIC_COLLECTION': DynamicCollection,
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
