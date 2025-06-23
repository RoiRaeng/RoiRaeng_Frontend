'use client';

import Image from 'next/image';
import BackIcon from '@/assets/icons/back-icon.svg';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/utils/cartStore';
import BuyBar from '@/components/BuyBar';
import { useEffect } from 'react';
import SwipeableCartItem from '@/components/SwipeableCartItem';

export default function MenuPage() {
  const router = useRouter();
  const cart = useCartStore((state: { cart: any }) => state.cart);

  useEffect(() => {
    if (!cart || cart.length === 0) {
      router.push('/home');
    }
  }, [cart, router]);

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
        <span
          className="text-[#D7284E] cursor-pointer"
          onClick={() => router.push('/menu')}
        >
          สั่งอาหารเพิ่ม
        </span>
      </div>

      <div
        className="space-y-4 overflow-y-auto scrollbar-hide"
        style={{ maxHeight: 'calc(100vh - 320px)' }}
      >
        {cart.map((item: any, index: any) => (
           <SwipeableCartItem key={item.id} item={item} index={index} />
        ))}
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
      <BuyBar />
    </main>
  );
}