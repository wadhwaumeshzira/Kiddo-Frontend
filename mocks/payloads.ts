import { Image } from 'react-native';
import { SDUINode } from '../src/types/SDUITypes';

const kiddoBg = require('../assets/kiddo_bg.png') as any;
const newPromoBg = require('../assets/new_promo.png') as any;
const mascotBanner = require('../assets/mascot_banner.png') as any;

export const mockPayloads: Record<string, SDUINode[]> = {
  'back-to-school': [
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
        items: [
          {
            id: 's1_card',
            type: 'PRODUCT_CARD',
            props: { productId: 's1' }
          },
          {
            id: 's2_card',
            type: 'PRODUCT_CARD',
            props: { productId: 's2' }
          },
          {
            id: 's3_card',
            type: 'PRODUCT_CARD',
            props: { productId: 's3' }
          },
          {
            id: 's4_card',
            type: 'PRODUCT_CARD',
            props: { productId: 's4' }
          }
        ]
      }
    }
  ],
  'mystery-carnival': [
    {
      id: 'banner_2',
      type: 'BANNER_HERO',
      props: {
        imageUrl: kiddoBg,
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
