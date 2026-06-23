import { create } from 'zustand';

interface CartItem {
  productId: string;
  qty: number;
}

interface AppState {
  cart: Record<string, CartItem>;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useStore = create<AppState>((set) => ({
  cart: {},
  addToCart: (productId: string) =>
    set((state) => {
      const existingItem = state.cart[productId];
      return {
        cart: {
          ...state.cart,
          [productId]: {
            productId,
            qty: existingItem ? existingItem.qty + 1 : 1,
          },
        },
      };
    }),
  removeFromCart: (productId: string) =>
    set((state) => {
      const existingItem = state.cart[productId];
      if (!existingItem) return state;
      const newCart = { ...state.cart };
      if (existingItem.qty > 1) {
        newCart[productId] = { ...existingItem, qty: existingItem.qty - 1 };
      } else {
        delete newCart[productId];
      }
      return { cart: newCart };
    }),
  clearCart: () => set({ cart: {} }),
}));
