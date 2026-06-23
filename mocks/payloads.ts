import { Image } from 'react-native';
import { SDUINode } from '../src/types/SDUITypes';

const kiddoBg = require('../assets/kiddo_bg.png') as any;
const newPromoBg = require('../assets/new_promo.png') as any;
const mascotBanner = require('../assets/mascot_banner.png') as any;
const comingSoonBanner = require('../assets/coming_soon_banner.png') as any;

export const mockPayloads: Record<string, SDUINode[]> = {
  'all': [
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
          { id: 's1_card', type: 'PRODUCT_CARD', props: { productId: 's1' } },
          { id: 's2_card', type: 'PRODUCT_CARD', props: { productId: 's2' } },
          { id: 's3_card', type: 'PRODUCT_CARD', props: { productId: 's3' } },
          { id: 's4_card', type: 'PRODUCT_CARD', props: { productId: 's4' } }
        ]
      }
    },
    {
      id: 'collection_2',
      type: 'DYNAMIC_COLLECTION',
      props: {
        title: 'Carnival Toys 🎡',
        items: [
          { id: 'c1_card', type: 'PRODUCT_CARD', props: { productId: 'c1' } },
          { id: 'c2_card', type: 'PRODUCT_CARD', props: { productId: 'c2' } },
          { id: 'c3_card', type: 'PRODUCT_CARD', props: { productId: 'c3' } },
          { id: 'c4_card', type: 'PRODUCT_CARD', props: { productId: 'c4' } }
        ]
      }
    },
    {
      id: 'collection_3',
      type: 'DYNAMIC_COLLECTION',
      props: {
        title: 'Baby Essentials 🍼',
        items: [
          { id: 'e1_card', type: 'PRODUCT_CARD', props: { productId: 'p6' } }, // Wipes
          { id: 'e2_card', type: 'PRODUCT_CARD', props: { productId: 'p5' } }, // Socks
          { id: 'e3_card', type: 'PRODUCT_CARD', props: { productId: 'p1' } }  // Onesie
        ]
      }
    }
  ],
  'boy': [
    {
      id: 'banner_boy',
      type: 'BANNER_HERO',
      props: {
        imageUrl: kiddoBg,
        action: { type: 'DEEP_LINK', url: '/boy-fashion' },
      },
    },
    {
      id: 'collection_boy',
      type: 'DYNAMIC_COLLECTION',
      props: {
        title: 'Boys Collection 👦',
        items: [
          { id: 'b1', type: 'PRODUCT_CARD', props: { productId: 'p4' } }, // Shorts
          { id: 'b2', type: 'PRODUCT_CARD', props: { productId: 's1' } }, // Superhero lunchbox
          { id: 'b3', type: 'PRODUCT_CARD', props: { productId: 's2' } }, // Galaxy school bag
          { id: 'b4', type: 'PRODUCT_CARD', props: { productId: 'p2' } }  // Sunglasses
        ]
      }
    }
  ],
  'girl': [
    {
      id: 'banner_girl',
      type: 'BANNER_HERO',
      props: {
        imageUrl: mascotBanner,
        action: { type: 'DEEP_LINK', url: '/girl-fashion' },
      },
    },
    {
      id: 'grid_girl',
      type: 'PRODUCT_GRID_2X2',
      props: {
        productIds: ['p1', 's3', 'p5', 'p6'], // Onesie, Dino pouch, Socks, Wipes
      },
    }
  ],
  'toys': [
    {
      id: 'banner_toys',
      type: 'BANNER_HERO',
      props: {
        imageUrl: kiddoBg,
        action: { type: 'APPLY_MYSTERY_GIFT_COUPON', code: 'TOYS20' },
      },
    },
    {
      id: 'grid_toys',
      type: 'PRODUCT_GRID_2X2',
      props: {
        productIds: ['c1', 'c2', 'c3', 'c4'], // Carnival candy, plush toy, party hat, mystery box
      },
    },
    {
      id: 'collection_toys',
      type: 'DYNAMIC_COLLECTION',
      props: {
        title: 'Best Sellers ⭐',
        items: [
          { id: 't1', type: 'PRODUCT_CARD', props: { productId: 'p1' } }, 
          { id: 't2', type: 'PRODUCT_CARD', props: { productId: 'c2' } }
        ]
      }
    }
  ],
  'shoes': [
    {
      id: 'collection_shoes',
      type: 'DYNAMIC_COLLECTION',
      props: {
        title: 'Gear & Shoes 👟',
        items: [
          { id: 'sh1', type: 'PRODUCT_CARD', props: { productId: 'p3' } }, // Stroller
          { id: 'sh2', type: 'PRODUCT_CARD', props: { productId: 'p5' } }, // Socks
        ]
      }
    }
  ],
  'coming-soon': [
    {
      id: 'banner_soon',
      type: 'BANNER_HERO',
      props: {
        imageUrl: comingSoonBanner,
        action: { type: 'DEEP_LINK', url: '/home' },
      },
    },
    {
      id: 'collection_soon',
      type: 'DYNAMIC_COLLECTION',
      props: {
        title: 'More items coming soon! ✨',
        items: []
      }
    }
  ]
};
