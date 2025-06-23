'use client';

import { useCartStore } from '@/utils/cartStore';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/apis/menu.api';

export default function BuyBar() {
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce((sum, item) => {
    const additionTotal =
      item.addition_types
        ?.flatMap((type) => type.additions.filter((a) => a.selected))
        .reduce((acc, a) => acc + a.price, 0) || 0;

    return sum + (item.price + additionTotal) * item.quantity;
  }, 0);

  const mutationAddMenu = useMutation({
    mutationFn: async () => {
      return await createOrder(cart);
    },
    onSuccess: () => {
      console.log('Order created successfully');
      router.push('/history');
    },
    onError: (error) => {
      console.error('Error creating order:', error);
      alert('ไม่สามารถสั่งอาหารได้ กรุณาลองใหม่');
    },
  });

  if (cart.length === 0) return null;

  return (
    <div className="fixed p-2 bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50">
      <div className="max-w-md mx-auto p-2">
        <button
          onClick={() => {
            console.log('Order creating');
            mutationAddMenu.mutate();
          }}
          disabled={mutationAddMenu.isPending}
          // className="w-full bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          className="w-full flex items-center justify-between bg-[#D7284E] text-white px-4 py-2 rounded-md shadow"

        
        >
          {/* จำนวนรวม */}
          <div className="bg-white text-[#D7284E] font-bold w-7 h-7 rounded flex items-center justify-center mr-3 text-sm">
            {totalQuantity}
          </div>

          {/* ข้อความปุ่ม */}
          <span className="font-medium flex-1 text-left">
            {mutationAddMenu.isPending ? 'กำลังสั่ง...' : 'สั่งอาหาร'}
          </span>

          {/* ราคารวม */}
          <span className="font-bold">฿{totalPrice}</span>
        </button>
      </div>
    </div>
  );
}
