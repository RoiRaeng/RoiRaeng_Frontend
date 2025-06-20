'use client';

import Image from 'next/image';
import BackIcon from '@/assets/icons/back-icon.svg';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/utils/cartStore';
import BuyBar from '@/components/BuyBar';

export default function MenuPage() {
  const router = useRouter();
  const cart = useCartStore((state: { cart: any }) => state.cart);

  const updateQuantityByIndex = useCartStore(
    (state) => state.updateQuantityByIndex
  );
  const totalQuantity = cart.reduce(
    (sum: any, item: { quantity: any }) => sum + item.quantity,
    0
  );
  const totalPrice = cart.reduce(
    (
      sum: number,
      item: { addition_types: any[]; price: any; quantity: number }
    ) => {
      const additionTotal =
        item.addition_types
          ?.flatMap((type) =>
            type.additions.filter((a: { selected: any }) => a.selected)
          )
          .reduce((acc, a) => acc + a.price, 0) || 0;

      return sum + (item.price + additionTotal) * item.quantity;
    },
    0
  );

  return (
    <main className="max-w-md mx-auto min-h-screen p-6 bg-white relative">
      <div className="flex flex-row items-center mb-4 relative">
        <div
          className="w-[45px] flex-shrink-0 cursor-pointer"
          onClick={() => router.push('/menu')}
        >
          <Image src={BackIcon} alt="BackIcon" width={45} height={45} />
        </div>
        <h1 className="flex-1 text-3xl text-black font-medium text-center">
          รายการอาหาร
        </h1>
        <div className="w-[45px] flex-shrink-0 cursor-pointer"></div>
      </div>

      <div className="flex justify-between items-center font-semibold text-sm mb-2">
        <span>รายการอาหารที่สั่งซื้อ</span>
        <span className="text-[#D7284E] cursor-pointer">สั่งอาหารเพิ่ม</span>
      </div>

      <div className="space-y-4">
        {cart.map(
          (
            item: {
              addition_types: any[];
              id: any;
              quantity: any;
              name: any;
              price: any;
            },
            index: number
          ) => {
            const selectedAdditions = item.addition_types.flatMap((type) =>
              type.additions.filter((a: { selected: any }) => a.selected)
            );

            return (
              <div key={item.id} className="rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="border rounded w-6 h-6 flex items-center justify-center text-xs">
                      {item.quantity}
                    </div>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <span>฿{item.price}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {selectedAdditions.map((add) => (
                    <div key={add.id}>{add.name}</div>
                  ))}
                </div>
                <div className="flex flex-row justify-between items-center mt-2">
                  <div className="text-xs text-[#D7284E] mt-1 cursor-pointer">
                    แก้ไข
                  </div>
                <div className='flex flex-row items-center gap-3'>


                  <button
                    className="w-6 h-6 rounded-full border flex items-center justify-center bg-gray-100"
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantityByIndex(index, -1);
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="w-6 h-6 rounded-full border flex items-center justify-center bg-gray-200"
                    onClick={() => updateQuantityByIndex(index, 1)}
                  >
                    +
                  </button>
                                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>

      <hr className="my-4" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>ค่าอาหาร</span>
          <span>฿{totalPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>ส่วนลด</span>
          <span>฿0</span>
        </div>
        <div className="flex justify-between font-medium text-[#D7284E]">
          <span>ทั้งหมด</span>
          <span>฿{totalPrice}</span>
        </div>
      </div>
      <BuyBar/>
    </main>
  );
}
