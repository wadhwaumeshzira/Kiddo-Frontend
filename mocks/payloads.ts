import { SDUINode } from '../src/types/SDUITypes';

export const mockPayloads: Record<string, SDUINode[]> = {
  'back-to-school': [
    {
      id: 'banner_1',
      type: 'BANNER_HERO',
      props: {
        imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
        action: { type: 'DEEP_LINK', url: '/school-supplies' },
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
          id: 'grid_1',
          type: 'PRODUCT_GRID_2X2',
          props: {
            productIds: ['p1', 'p2', 'p3', 'p4'],
          },
        },
        {
          id: 'grid_2',
          type: 'PRODUCT_GRID_2X2',
          props: {
            productIds: ['p5', 'p6', 'p7', 'p8'],
          },
        },
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
      id: 'collection_2',
      type: 'DYNAMIC_COLLECTION',
      props: {
        title: 'Carnival Treats 🍭',
      },
      children: [
        {
          id: 'grid_3',
          type: 'PRODUCT_GRID_2X2',
          props: {
            productIds: ['c1', 'c2'],
          },
        },
      ],
    },
  ],
};
