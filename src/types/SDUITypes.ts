export type ComponentType = 'BANNER_HERO' | 'PRODUCT_GRID_2X2' | 'DYNAMIC_COLLECTION' | 'FULL_SCREEN_OVERLAY';

export type ActionType = 'ADD_TO_CART' | 'DEEP_LINK' | 'APPLY_MYSTERY_GIFT_COUPON';

export type ActionPayload = 
  | { type: 'ADD_TO_CART'; productId: string }
  | { type: 'DEEP_LINK'; url: string }
  | { type: 'APPLY_MYSTERY_GIFT_COUPON'; code: string };

export interface BaseNode {
  id: string;
  type: string; // use string to catch and safely handle unknown types
}

export interface BannerHeroNode extends BaseNode {
  type: 'BANNER_HERO';
  props: { imageUrl: string; action?: ActionPayload };
}

export interface ProductGridNode extends BaseNode {
  type: 'PRODUCT_GRID_2X2';
  props: { productIds: string[] };
}

export interface DynamicCollectionNode extends BaseNode {
  type: 'DYNAMIC_COLLECTION';
  props: { title: string };
  children: SDUINode[];
}

export interface FullScreenOverlayNode extends BaseNode {
  type: 'FULL_SCREEN_OVERLAY';
  props: { animationUrl: string };
}

export type SDUINode = BannerHeroNode | ProductGridNode | DynamicCollectionNode | FullScreenOverlayNode | BaseNode;
