import { create } from 'zustand';

export type Addition = {
  id: string;
  name: string;
  price: number;
  selected?: boolean;
};

export type AdditionType = {
  id: string;
  name: string;
  max_select: number;
  additions: Addition[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: any;
  addition_types: AdditionType[];
  quantity: number;
  note?: string | null;
};

type CartState = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, delta: number) => void;
  updateQuantityByIndex: (index: number, delta: number) => void; // <- เพิ่มใน type
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const isSameProduct = (a: Product, b: Product) => {
        if (
          a.id !== b.id ||
          a.note !== b.note ||
          a.price !== b.price ||
          a.quantity !== b.quantity ||
          a.addition_types.length !== b.addition_types.length
        ) {
          return false;
        }
        for (let i = 0; i < a.addition_types.length; i++) {
          const atA = a.addition_types[i];
          const atB = b.addition_types[i];
          if (
            atA.id !== atB.id ||
            atA.name !== atB.name ||
            atA.max_select !== atB.max_select ||
            atA.additions.length !== atB.additions.length
          ) {
            return false;
          }
          for (let j = 0; j < atA.additions.length; j++) {
            const addA = atA.additions[j];
            const addB = atB.additions[j];
            if (
              addA.id !== addB.id ||
              addA.name !== addB.name ||
              addA.price !== addB.price ||
              addA.selected !== addB.selected
            ) {
              return false;
            }
          }
        }
        return true;
      };

      const existingIndex = state.cart.findIndex((item) =>
        isSameProduct(item, product)
      );
      if (existingIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += product.quantity;
        return { cart: updatedCart };
      } else {
        return { cart: [...state.cart, product] };
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  clearCart: () => set({ cart: [] }),

  updateQuantity: (productId, delta) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
      return { cart: updatedCart };
    }),

  updateQuantityByIndex: (index, delta) =>
    set((state) => {
      const updatedCart = [...state.cart];
      if (!updatedCart[index]) return state;

      updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
      return { cart: updatedCart };
    }),
}));
