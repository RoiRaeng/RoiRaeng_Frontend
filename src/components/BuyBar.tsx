'use client';

import { useCartStore } from '@/utils/cartStore';
import { useRouter } from 'next/navigation';

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

  if (cart.length === 0) return null; 

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50">
      <div className="max-w-md mx-auto p-2">
        <button
          onClick={() => router.push('/history')}
          className="w-full flex items-center justify-between bg-[#D7284E] text-white px-4 py-2 rounded-md shadow"
        >
          {/* จำนวน */}
          <div className="bg-white text-[#D7284E] font-bold w-7 h-7 rounded flex items-center justify-center mr-3 text-sm">
            {totalQuantity}
          </div>

          {/* ข้อความ */}
          <span className="font-medium flex-1 text-left">สั่งอาหาร</span>

          {/* ราคา */}
          <span className="font-bold">฿{totalPrice}</span>
        </button>
      </div>
    </div>
  );
}
