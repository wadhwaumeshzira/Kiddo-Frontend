import { create } from 'zustand';

interface CartItem {
  productId: string;
  qty: number;
}

interface AppState {
  cart: Record<string, CartItem>;
  addToCart: (productId: string) => void;
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
  clearCart: () => set({ cart: {} }),
}));
