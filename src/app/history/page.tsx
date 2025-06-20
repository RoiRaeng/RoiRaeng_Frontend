'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BackIcon from '@/assets/icons/back-icon.svg';

export default function MenuPage() {
  const router = useRouter();
  return (
    <main className="max-w-md mx-auto min-h-screen p-6 bg-white relative">
      <div className="flex flex-row items-center mb-4 relative">
        <div
          className="w-[45px] flex-shrink-0 cursor-pointer"
          onClick={() => router.push('/home?table=NTpidXJnZXItc2VjcmV0LWtleQ==')}
        >
          <Image src={BackIcon} alt="BackIcon" width={45} height={45} />
        </div>
        <h1 className="flex-1 text-3xl text-black font-medium text-center">
          ประวัติการสั่งซื้อ
        </h1>
        <div className="w-[45px] flex-shrink-0 cursor-pointer"></div>
      </div>
      This is ประวัติการสั่งซื้อ page
    </main>
  );
}
