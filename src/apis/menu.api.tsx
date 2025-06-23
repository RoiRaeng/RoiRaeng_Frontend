
import axios from 'axios';
// import { Product } from '@/utils/cartStore';

export const createOrder = async (cart: any) => {
  const response = await axios.post('/api/orders', { cart });
  return response.data;
};
