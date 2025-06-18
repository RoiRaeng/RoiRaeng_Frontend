'use client';

import { Card, Carousel, Input } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { CiSearch } from 'react-icons/ci';
import Image from 'next/image';
import BurgerPromo from '@/assets/icons/burger-icon.svg';
import CategloryPizza from '@/assets/icons/categlory-pizza.svg';
import CategloryHambur from '@/assets/icons/categlory-hamburger.svg';
import CateglorySanwish from '@/assets/icons/categlory-sandwish.svg';

import Banner1 from '@/assets/icons/banner-promotion.jpg';
import Banner2 from '@/assets/icons/banner-promotion2.jpg';

import Meta from 'antd/es/card/Meta';

import { useCateglory } from '@/context/CategloryContext';

type MenuItem = {
  id: number;
  name: string;
  price: number;
};

type Categlory = {
  id: number;
  name: string;
  image: string;
};

const mockMenu: MenuItem[] = [
  { id: 1, name: 'ข้าวกระเพราไก่ไข่ดาว', price: 55 },
  { id: 2, name: 'ข้าวผัดหมู', price: 50 },
  { id: 3, name: 'ต้มยำกุ้ง', price: 80 },
];

const categlory: Categlory[] = [
  { id: 1, name: 'พิซซ่า', image: CategloryPizza },
  { id: 2, name: 'เบอร์เกอร์', image: CategloryHambur },
  { id: 3, name: 'แซนวิซ', image: CateglorySanwish },
  { id: 4, name: 'แซนวิซ', image: CateglorySanwish },
  { id: 5, name: 'แซนวิซ', image: CateglorySanwish },
  { id: 6, name: 'แซนวิซ', image: CateglorySanwish },
];

const carouselItems = [
  {
    content: Banner1,
    alt: 'เมนูยอดฮิต',
    title: 'สายเนื้อห้ามพลาด!',
    subtitle: 'เนื้อวัวย่างหอมๆ ชุ่มฉ่ำ ละลายในปาก พร้อมชีสเยิ้มๆ และซอสรสเด็ด',
  },
  {
    content: Banner2,
    alt: 'เมนูยอดฮิต',
    title: 'กรอบฟินจนหยุดไม่อยู่!',
    subtitle: 'ไก่ทอดกรอบนอกนุ่มใน คลุกซอสสูตรพิเศษ กลิ่นหอมเย้ายวนทุกคำ',
  },
];

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '180px',
  color: '#fff',
  lineHeight: '180px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '16px 16px 0px 0px',
};

export default function MenuPage() {
  const searchParams = useSearchParams();
  const table = searchParams.get('table');
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSlideChange = (currentSlide: number) => {
    setCurrentIndex(currentSlide);
  };
  const { categlories, setCateglories } = useCateglory();

  const [cart, setCart] = useState<MenuItem[]>([]);
  console.log('categlories in context: ', categlories);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => [...prev, item]);
  };

  const handleOrder = () => {
    if (!table) {
      alert('ไม่พบหมายเลขโต๊ะ');
      return;
    }
    console.log('ส่งออเดอร์จากโต๊ะ: ', table);
    console.log('รายการอาหาร: ', cart);

    alert(`ส่งออเดอร์เรียบร้อยจากโต๊ะ ${table}`);
    setCart([]);
  };

  return (
    <main className="p-6 bg-white">
      <h1 className="text-2xl text-black font-bold mb-4 text-center">
        โต๊ะหมายเลข {table ? `(โต๊ะ ${table})` : ''}
      </h1>
      <Input
        size="large"
        placeholder="large size"
        prefix={<CiSearch />}
        style={{ borderRadius: 9999 }}
      />

      <div className="bg-[#D7284E] rounded-2xl mt-4 h-fit w-full flex items-center justify-between px-6">
        {/* ข้อความด้านซ้าย */}
        <div className="py-3 flex flex-col items-start">
          <h2 className="text-2xl font-bold text-white">โปรโมชั่นสุดคุ้ม!</h2>
          <p className="text-sm mt-4 text-white">
            อร่อยจัดเต็มใน
            <br />
            <span className="ml-6">ราคาสุดพิเศษ!!!</span>
          </p>
          <button className="bg-white text-black font-bold px-4 py-1 rounded-full text-sm shadow mt-5">
            ดูทั้งหมด &gt;
          </button>
        </div>
        {/* รูปเบอร์เกอร์ด้านขวา */}
        <div className="flex items-center justify-end">
          <Image src={BurgerPromo} alt="burger" width={167} height={125} />
        </div>
      </div>

      <div className="flex flex-row items-center justify-between text-black text-xl mt-4 ">
        <span className="font-bold">หมวดหมู่</span>
        <button className="text-base">ทั้งหมด</button>
      </div>
      <div className="flex gap-4 mt-4 overflow-x-auto hide-scrollbar pb-2">
        {categlory.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center min-w-[100px] focus:outline-none"
              type="button"
              onClick={() => {
              setCateglories([item]);
              window.location.href = '/categlory';
              }}
            >
              <div className="flex items-center justify-center bg-white overflow-hidden mb-2 h-24 w-24 rounded-lg ">
              <Image
                src={item.image}
                alt={item.name}
                width={96}
                height={96}
                className="object-cover h-full w-full"
              />
              </div>
              <span className="font-normal text-black text-center">
              {item.name}
              </span>
            </button>
        ))}
      </div>

      <span className="text-black text-xl font-bold mt-4">เมนูยอดฮิต</span>
      <div className="mt-5">
        <div className="mt-5">
          <Carousel arrows infinite={false} afterChange={handleSlideChange}>
            {carouselItems.map((item, index) => (
              <div key={index}>
                <Image
                  src={item.content}
                  alt={item.alt || ''}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    objectPosition: 'center 40%',
                    borderRadius: '16px 16px 0px 0px',
                  }}
                  width={800}
                  height={160}
                  draggable={true}
                />
              </div>
            ))}
          </Carousel>

          {/* ส่วนแสดง title/subtitle */}
          <div className=" border border-gray-300 p-4 rounded-b-[16px] bg-white">
            <Meta
              title={carouselItems[currentIndex].title}
              description=""
              className="text-black text-lg font-extrabold"
            />
            <span className="text-black block mt-1">
              {carouselItems[currentIndex].subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {mockMenu.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600">ราคา: {item.price} บาท</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"
            >
              เพิ่มใส่ตะกร้า
            </button>
          </div>
        ))}
      </div> */}

      {/* <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">ตะกร้าอาหาร</h2>
        {cart.length === 0 ? (
          <p>ยังไม่มีรายการ</p>
        ) : (
          <ul className="list-disc pl-6">
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.price} บาท
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleOrder}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={cart.length === 0}
        >
          ส่งออเดอร์
        </button>
      </div> */}
    </main>
  );
}
