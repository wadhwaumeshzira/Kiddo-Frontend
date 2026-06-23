const p1 = require('../assets/prod_1.png') as any;
const p2 = require('../assets/prod_2.png') as any;
const p3 = require('../assets/prod_3.png') as any;
const p4 = require('../assets/prod_4.png') as any;
const p5 = require('../assets/prod_5.png') as any;
const p6 = require('../assets/prod_6.png') as any;

export interface ProductMock {
  id: string;
  name: string;
  price: number;
  image: any;
}

export const MockProducts: Record<string, ProductMock> = {
  p1: { id: 'p1', name: 'Rainbow Onesie', price: 14.99, image: p1 },
  p2: { id: 'p2', name: 'Kiddo Sunglasses', price: 8.50, image: p2 },
  p3: { id: 'p3', name: 'Premium Stroller', price: 199.99, image: p3 },
  p4: { id: 'p4', name: 'Striped Shorts', price: 12.00, image: p4 },
  p5: { id: 'p5', name: 'Comfy Socks', price: 5.99, image: p5 },
  p6: { id: 'p6', name: 'Baby Wipes Pack', price: 4.50, image: p6 },
  
  c1: { id: 'c1', name: 'Carnival Candy', price: 3.99, image: p1 },
  c2: { id: 'c2', name: 'Plush Toy', price: 24.99, image: p2 },
  c3: { id: 'c3', name: 'Party Hat', price: 2.99, image: p3 },
  c4: { id: 'c4', name: 'Mystery Box', price: 9.99, image: p4 },
};
