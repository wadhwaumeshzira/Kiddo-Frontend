const iconBear = require('../assets/illustrations/bear.png') as any;
const iconOnesie = require('../assets/illustrations/onesie.png') as any;
const iconStroller = require('../assets/illustrations/stroller.png') as any;
const iconBottle = require('../assets/illustrations/bottle.png') as any;
const iconSunglasses = require('../assets/illustrations/sunglasses.png') as any;
const iconShorts = require('../assets/illustrations/shorts.png') as any;
const iconSocks = require('../assets/illustrations/socks.png') as any;
const iconWipes = require('../assets/illustrations/wipes.png') as any;
const iconCandy = require('../assets/illustrations/candy.png') as any;
const iconHat = require('../assets/illustrations/hat.png') as any;
const iconBox = require('../assets/illustrations/box.png') as any;
const iconLunchbox = require('../assets/illustrations/lunchbox.png') as any;
const iconSchoolbag = require('../assets/illustrations/schoolbag.png') as any;
const iconPouch = require('../assets/illustrations/pouch.png') as any;
const iconWaterbottle = require('../assets/illustrations/waterbottle.png') as any;

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
  p1: { id: 'p1', name: 'Rainbow Onesie', price: 399, originalPrice: 599, discountBadge: '33% OFF', isBestseller: true, image: iconOnesie },
  p2: { id: 'p2', name: 'Kiddo Sunglasses', price: 299, image: iconSunglasses },
  p3: { id: 'p3', name: 'Premium Stroller', price: 4999, originalPrice: 6999, discountBadge: '28% OFF', image: iconStroller },
  p4: { id: 'p4', name: 'Striped Shorts', price: 349, isBestseller: true, image: iconShorts },
  p5: { id: 'p5', name: 'Comfy Socks', price: 149, image: iconSocks },
  p6: { id: 'p6', name: 'Baby Wipes Pack', price: 199, discountBadge: 'DEAL', image: iconWipes },
  
  c1: { id: 'c1', name: 'Carnival Candy', price: 49, originalPrice: 99, discountBadge: '50% OFF', image: iconCandy },
  c2: { id: 'c2', name: 'Plush Toy', price: 899, isBestseller: true, image: iconBear },
  c3: { id: 'c3', name: 'Party Hat', price: 99, image: iconHat },
  c4: { id: 'c4', name: 'Mystery Box', price: 499, discountBadge: '50% OFF', originalPrice: 999, image: iconBox },

  s1: { id: 's1', name: 'Superhero Lunchbox', price: 599, isBestseller: true, image: iconLunchbox },
  s2: { id: 's2', name: 'Galaxy School Bag', price: 1299, originalPrice: 1599, discountBadge: '18% OFF', image: iconSchoolbag },
  s3: { id: 's3', name: 'Dino Stationery Pouch', price: 299, image: iconPouch },
  s4: { id: 's4', name: 'Steel Water Bottle', price: 499, isBestseller: true, image: iconWaterbottle },
};
