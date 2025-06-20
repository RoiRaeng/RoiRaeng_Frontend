'use client';

import { useState } from 'react';
import Image from 'next/image';
import ListIcon from '@/assets/icons/icon-list.svg';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import CartIcon from '@/assets/icons/cart-icon.svg';
import ReceiptIcon from '@/assets/icons/receipt-icon.svg';
import CloseIcon from '@/assets/icons/close-icon.svg';


export default function FloatButtonHome() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-4 right-4 z-50">
      {/* ปุ่มย่อย */}
      <div
        className={`flex flex-col items-end space-y-2 mb-2 transition-all ${
          open
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* ปุ่มย่อยที่ 1 */}
        <button
          className="w-12 h-12 rounded-full bg-[#D7284E] text-white flex items-center justify-center shadow-md hover:bg-rose-700 transition"
          aria-label="Comment"
        >
          <Image src={ReceiptIcon} alt="List Icon" width={24} height={24} />
        </button>

        {/* ปุ่มย่อยที่ 2 */}
        <button
          className="w-12 h-12 rounded-full bg-[#D7284E] text-white flex items-center justify-center shadow-md hover:bg-rose-700 transition"
          aria-label="Empty"
        >
          <Image src={CartIcon} alt="List Icon" width={24} height={24} />
        </button>
      </div>

      {/* ปุ่มหลัก */}
      <button
        className="w-12 h-12 rounded-full bg-[#D7284E] text-white flex items-center justify-center shadow-lg hover:bg-rose-700 transition"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        <Image src={open == false ? ListIcon: CloseIcon} alt="List Icon" width={24} height={24} />
      </button>
    </div>
  );
}
