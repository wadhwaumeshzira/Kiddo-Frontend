import { ActionPayload } from '../types/SDUITypes';
import { useStore } from '../store/useStore';

export const handleAction = (action?: ActionPayload) => {
  if (!action) return;

  switch (action.type) {
    case 'ADD_TO_CART':
      useStore.getState().addToCart(action.productId);
      console.log(`[Dispatcher] Added ${action.productId} to cart.`);
      break;
    case 'REMOVE_FROM_CART':
      useStore.getState().removeFromCart(action.productId);
      break;
    case 'DEEP_LINK':
      console.log(`[Dispatcher] Navigating to ${action.url}`);
      // Navigation logic goes here
      break;
    case 'APPLY_MYSTERY_GIFT_COUPON':
      console.log(`[Dispatcher] Applying mystery gift coupon: ${action.code}`);
      // Coupon logic
      break;
    default:
      // TypeScript Exhaustiveness check - this will fail to compile if we miss a case!
      const _exhaustiveCheck: never = action;
      console.error(`[Dispatcher] Unhandled action type: ${action}`);
  }
};
