'use client';

import { useProductStore } from '@/utils/store';
import { useEffect, useState } from 'react';

export default function DetailPage() {
  const product = useProductStore((state) => state.product);

  if (!product) return <p>ไม่มีข้อมูล</p>;

  // if (!state) return <p>Loading...</p>;

  return (
    <div>
      <h1>รายละเอียดสินค้า</h1>
      <p>ชื่อสินค้า: {product.name}</p>
      <p>ราคา: {product.price} ฿</p>
      <img src={product.image} alt={product.name} width={200} />
    </div>
  );
}
