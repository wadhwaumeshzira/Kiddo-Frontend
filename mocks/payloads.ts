import { Image } from 'react-native';
import { SDUINode } from '../src/types/SDUITypes';

const kiddoBg = require('../assets/kiddo_bg.png') as any;
const newPromoBg = require('../assets/new_promo.png') as any;
const diaperPromo = require('../assets/diaper_promo.png') as any;

export const mockPayloads: Record<string, SDUINode[]> = {
  'back-to-school': [
    {
      id: 'banner_main',
      type: 'BANNER_HERO',
      props: {
        imageUrl: diaperPromo,
        fullWidth: true,
      },
    },
    {
      id: 'banner_1',
      type: 'BANNER_HERO',
      props: {
        imageUrl: kiddoBg,
        action: { type: 'DEEP_LINK', url: '/school-supplies' },
      },
    },
    {
      id: 'grid_1',
      type: 'PRODUCT_GRID_2X2',
      props: {
        productIds: ['p1', 'p2', 'p3', 'p4'],
      },
    },
    {
      id: 'collection_1',
      type: 'DYNAMIC_COLLECTION',
      props: {
        title: 'Trending for School 🎒',
      },
      children: [
        {
          id: 'cb_1',
          type: 'BANNER_HERO',
          props: { imageUrl: newPromoBg }
        },
        {
          id: 'cb_2',
          type: 'BANNER_HERO',
          props: { imageUrl: 'https://images.unsplash.com/photo-1542838686-37ed7a7ef940?w=800&q=80' }
        }
      ],
    },
  ],
  'mystery-carnival': [
    {
      id: 'banner_2',
      type: 'BANNER_HERO',
      props: {
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
        action: { type: 'APPLY_MYSTERY_GIFT_COUPON', code: 'CARNIVAL20' },
      },
    },
    {
      id: 'grid_2',
      type: 'PRODUCT_GRID_2X2',
      props: {
        productIds: ['c1', 'c2', 'c3', 'c4'],
      },
    },
  ],
};
