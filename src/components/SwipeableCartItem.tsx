'use client';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useCartStore } from '@/utils/cartStore';
import classNames from 'classnames';

export default function SwipeableCartItem({ item, index }: { item: any, index: number }) {
  const removeFromCartByIndex = useCartStore((state) => state.removeFromCartByIndex);
  const updateQuantityByIndex = useCartStore((state) => state.updateQuantityByIndex);
  const [isSwipingOut, setIsSwipingOut] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0); // 0-100 เปอร์เซ็นต์ของการ swipe

  const selectedAdditions = item.addition_types.flatMap((type: any) =>
    type.additions.filter((a: any) => a.selected)
  );

  // ฟังก์ชันสำหรับจำลองการ swipe delete
  const triggerSwipeDelete = () => {
    setIsSwipingOut(true);
    setSwipeProgress(100);
    setTimeout(() => {
      removeFromCartByIndex(index);
      setSwipeProgress(0);
      setIsSwipingOut(false);
    }, 800);
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      // แสดงการเลื่อนแบบ real-time
      if (eventData.dir === 'Left' && eventData.deltaX < 0) {
        const progress = Math.min(Math.abs(eventData.deltaX) / 200, 1); // 200px = 100%
        setSwipeProgress(progress * 100);
      }
    },
    onSwipedLeft: () => {
      triggerSwipeDelete();
    },
    onSwiped: (eventData) => {
      // รีเซ็ตเมื่อไม่ได้ swipe ไปทางซ้าย หรือ swipe ไม่สำเร็จ
      if (eventData.dir !== 'Left' || !isSwipingOut) {
        setSwipeProgress(0);
      }
    },
    delta: 50,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div className="relative overflow-hidden">
      {/* Delete Background - แสดงเมื่อ swipe */}
      <div 
        className={classNames(
          "absolute inset-0 bg-[#D7284E] rounded-md flex items-center justify-end px-6 transition-all duration-300",
          {
            'opacity-100': swipeProgress > 0,
            'opacity-0': swipeProgress === 0,
          }
        )}
        style={{
          transform: `translateX(${100 - swipeProgress}%)`,
        }}
      >
        <div className="text-white font-semibold flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
          ลบ
        </div>
      </div>

      {/* Main Content */}
      <div
        {...handlers}
        style={{ 
          touchAction: 'pan-y',
          transform: `translateX(-${swipeProgress}%)`,
        }}
        className={classNames(
          'rounded-md p-4 border bg-white transition-all duration-300 ease-out relative z-10',
          {
            'translate-x-full opacity-0': isSwipingOut,
            'shadow-lg': swipeProgress > 0 && !isSwipingOut,
          }
        )}
      >
        {/* Content */}
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
          {selectedAdditions.map((add: any) => (
            <div key={add.id}>{add.name}</div>
          ))}
        </div>

        <div className="flex flex-row justify-between items-center mt-2">
          <div className="text-xs text-[#D7284E] mt-1 cursor-pointer">แก้ไข</div>
          <div className="flex flex-row items-center gap-3">
            <button
              className="w-6 h-6 rounded-full border flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => {
                if (item.quantity > 1) {
                  updateQuantityByIndex(index, -1);
                } else {
                  // ถ้าจำนวนเท่ากับ 1 ให้ trigger swipe delete animation
                  triggerSwipeDelete();
                }
              }}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="w-6 h-6 rounded-full border flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors"
              onClick={() => updateQuantityByIndex(index, 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Swipe Hint - แสดงเมื่อเริ่ม swipe */}
        {swipeProgress > 10 && swipeProgress < 80 && !isSwipingOut && (
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-red-500 text-sm font-medium opacity-80">
            เลื่อนเพื่อลบ →
          </div>
        )}
      </div>
    </div>
  );
}