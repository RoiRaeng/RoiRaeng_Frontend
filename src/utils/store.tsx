import { create } from 'zustand';

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type ProductStore = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
}));
