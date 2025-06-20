'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/utils/store';

import Image from 'next/image';

export default function DetailPage() {
  const product = useProductStore((state) => state.product);
  const router = useRouter();

  useEffect(() => {
    if (!product) {
      router.replace('/menu'); 
    }
  }, [product, router]);

  if (!product) {
    return <p>กำลังโหลดข้อมูล...</p>; 
  }

  return (
    <div>
      <h1>รายละเอียดสินค้า</h1>
      <Image src={product.image} alt={product.name} width={200} />
      <p>ชื่อสินค้า: {product.name}</p>
      <p>ราคา: {product.price} ฿</p>
    </div>
  );
}
