const iconBear = require('../assets/icon_bear.png') as any;
const iconOnesie = require('../assets/icon_onesie.png') as any;
const iconStroller = require('../assets/icon_stroller.png') as any;
const iconBottle = require('../assets/icon_bottle.png') as any;

export interface ProductMock {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  isBestseller?: boolean;
  image: any;
}

export const MockProducts: Record<string, ProductMock> = {
  p1: { id: 'p1', name: 'Rainbow Onesie', price: 14.99, originalPrice: 19.99, discountBadge: '25% OFF', isBestseller: true, image: iconOnesie },
  p2: { id: 'p2', name: 'Kiddo Sunglasses', price: 8.50, image: iconBear },
  p3: { id: 'p3', name: 'Premium Stroller', price: 199.99, originalPrice: 249.99, discountBadge: '20% OFF', image: iconStroller },
  p4: { id: 'p4', name: 'Striped Shorts', price: 12.00, isBestseller: true, image: iconOnesie },
  p5: { id: 'p5', name: 'Comfy Socks', price: 5.99, image: iconBear },
  p6: { id: 'p6', name: 'Baby Wipes Pack', price: 4.50, discountBadge: 'DEAL', image: iconBottle },
  
  c1: { id: 'c1', name: 'Carnival Candy', price: 3.99, originalPrice: 5.99, discountBadge: '33% OFF', image: iconBottle },
  c2: { id: 'c2', name: 'Plush Toy', price: 24.99, isBestseller: true, image: iconBear },
  c3: { id: 'c3', name: 'Party Hat', price: 2.99, image: iconOnesie },
  c4: { id: 'c4', name: 'Mystery Box', price: 9.99, discountBadge: '50% OFF', originalPrice: 19.99, image: iconStroller },
};
