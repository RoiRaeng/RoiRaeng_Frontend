'use client';

import { useCateglory } from '@/context/CategloryContext';
import BackIcon from '@/assets/icons/back-icon.svg';
import ShareIcon from '@/assets/icons/share-icon.svg';
import SearchIcon from '@/assets/icons/search-icon.svg';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';

import CategloryPizza from '@/assets/icons/categlory-pizza.svg';
import CategloryHambur from '@/assets/icons/categlory-hamburger.svg';
import CateglorySanwish from '@/assets/icons/categlory-sandwish.svg';

import burgur1 from '@/assets/icons/burgur-1.jpg';
import burgur2 from '@/assets/icons/burgur-2.jpg';
import burgur3 from '@/assets/icons/burgur-3.jpg';
import burgur4 from '@/assets/icons/burgur-4.jpg';


import { useProductStore } from '@/utils/store';

import Image from 'next/image';
import { FloatButton, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import FloatButtonHome from '@/components/FloatButton';
import CartBar from '@/components/CartBar';

export default function MenuPage() {
  const { categlories, setCateglories } = useCateglory();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);


  const products = [
    {
      id: 'e7a5c4b0-9c2f-4e31-9b79-1e0d1f3c1a1b',
      name: 'เบอร์เกอร์ชีสลาวา',
      price: 129,
      image: burgur1,
    },
    {
      id: '1f6e5c89-4e17-4dcb-bf02-345e7a942f0c',
      name: 'เบอร์เกอร์ไก่กรอบ',
      price: 159,
      image: burgur2,
    },
    {
      id: '7c843d3f-31f3-44cb-8f9e-0298bfc3b7c1',
      name: 'เบอร์เกอร์ข้าวทงคัตสึ',
      price: 78,

      image: burgur3,
    },
    {
      id: '7c843d3f-3193-44cb-8f9e-0298bfc3b7c1',
      name: 'เบอร์เกอร์เจ ',
      price: 99,
      image: burgur4,
    },
  ];

  const hamburgers = [
    {
      id: 'e7a5c4b0-9c2f-4e31-9b79-1e0d1f3c1a1b',
      name: 'แฮมเบอร์เกอร์หมู',
      price: 129,
      image: CategloryHambur,
    },
  ];

  const pizzas = [
    {
      id: '1f6e5c89-4e17-4dcb-bf02-345e7a942f0c',
      name: 'พิซซ่าชีสเยิ้ม',
      price: 159,
      image: CategloryPizza,
    },
  ];

  const sanwishes = [
    {
      id: '7c843d3f-31f3-44cb-8f9e-0298bfc3b7c1',
      name: 'แซนด์วิชทูน่า',
      price: 99,
      image: CateglorySanwish,
    },
  ];

  const router = useRouter();

  function renderProductList(data: any[]) {
    return data.map((product) => (
      <div
        key={product.id}
        className="flex flex-col bg-white cursor-pointer"
        onClick={() => {
          console.log('Product clicked:', product);
          useProductStore.getState().setProduct(product);
          router.push('/menu/detail');
        }}
      >
        <div className="w-full aspect-square relative flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            sizes="(max-width: 300px) 100vw, 250px"
          />
        </div>
        <div className="mt-2 text-left">
          <p className="font-light text-xl">{product.name}</p>
          <p className="my-2 text-xl font-medium">{product.price} ฿</p>
        </div>
      </div>
    ));
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 35,
            height: 20,
          }}
        >
          <Image src={SearchIcon} alt="SearchIcon" width={20} height={20} />
        </span>
      ),
      children: (
        <div className="grid grid-cols-2 gap-4">
          {renderProductList(products)}
        </div>
      ),
    },
    // {
    //   key: '2',
    //   label: 'โปรโมชั่น',
    //   children: 'Content of Tab Pane 2',
    // },
    {
      key: '3',
      label: 'เบอร์เกอร์',
      children: (
        <div className="grid grid-cols-2 gap-4">
          {hamburgers.map((hamburgers, index) => (
            <div
              key={index}
              className="flex flex-col items-start rounded-lg bg-white"
            >
              <Image
                src={hamburgers.image}
                alt={hamburgers.name}
                width={250}
                height={250}
                className="object-cover h-full w-full"
              />
              <div className="mt-2 text-left">
                <p className="mt-2 font-normal text-2xl">{hamburgers.name}</p>
                <p className="mt-2 text-xl font-bold">฿{hamburgers.price}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '4',
      label: 'พิซซ่า',
      children: (
        <div className="grid grid-cols-2 gap-4">
          {pizzas.map((pizzas, index) => (
            <div
              key={index}
              className="flex flex-col items-start rounded-lg bg-white"
            >
              <Image
                src={pizzas.image}
                alt={pizzas.name}
                width={250}
                height={250}
                className="object-cover h-full w-full"
              />
              <div className="mt-2 text-left">
                <p className="mt-2 font-normal text-2xl">{pizzas.name}</p>
                <p className="mt-2 text-xl font-bold">฿{pizzas.price}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '5',
      label: 'แซนวิช',
      children: (
        <div className="grid grid-cols-2 gap-4">
          {sanwishes.map((sanwishes, index) => (
            <div
              key={index}
              className="flex flex-col items-start rounded-lg bg-white"
            >
              <Image
                src={sanwishes.image}
                alt={sanwishes.name}
                width={250}
                height={250}
                className="object-cover h-full w-full"
              />
              <div className="mt-2 text-left">
                <p className="mt-2 font-normal text-2xl">{sanwishes.name}</p>
                <p className="mt-2 text-xl font-bold">฿{sanwishes.price}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '6',
      label: 'เครื่องดื่ม',
      children: 'Content of Tab Pane 4',
    },
    {
      key: '7',
      label: 'ของหวาน',
      children: 'Content of Tab Pane 4',
    },
  ];

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
          รายการอาหาร
        </h1>
        <div className="w-[45px] flex-shrink-0 flex justify-end">
          <Image src={ShareIcon} alt="ShareIcon" width={45} height={45} />
        </div>
      </div>

      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Tabs
            defaultActiveKey="2"
            items={items}
            onChange={(key) => console.log(key)}
          />
          <CartBar/>
        </motion.div>
      )}
    </main>
  );
}
