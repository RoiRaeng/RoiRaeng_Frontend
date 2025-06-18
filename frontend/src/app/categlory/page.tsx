'use client';

import { useCateglory } from '@/context/CategloryContext';
import BackIcon from '@/assets/icons/back-icon.svg';
import ShareIcon from '@/assets/icons/share-icon.svg';
import SearcgIcon from '@/assets/icons/search-icon.svg';

import CategloryPizza from '@/assets/icons/categlory-pizza.svg';
import CategloryHambur from '@/assets/icons/categlory-hamburger.svg';
import CateglorySanwish from '@/assets/icons/categlory-sandwish.svg';

import Image from 'next/image';
import { Tabs, TabsProps } from 'antd';
import Meta from 'antd/es/card/Meta';

export default function MenuPage() {
  const { categlories, setCateglories } = useCateglory();

  console.log('categlories in context: ', categlories);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <Image src={SearcgIcon} alt="BackIcon" width={30} height={30} />,
      children: (
        <div className="grid grid-cols-2 gap-4">
          {/* Item 1 */}
          <div className="flex flex-col items-start rounded-lg bg-white ">
            <Image
              src={CategloryPizza}
              alt="product1"
              width={250}
              height={250}
              className="object-cover h-full w-full"
            />
            <div className="mt-2 text-left">
              <p className="mt-2 font-normal text-2xl">พิซซ่าชีสเยิ้ม</p>
              <p className="mt-2 text-xl font-bold">฿159</p>
            </div>
          </div>
          <div className="flex flex-col items-start rounded-lg bg-white ">
            <Image
              src={CategloryHambur}
              alt="product1"
              width={250}
              height={250}
              className="object-cover h-full w-full"
            />
            <div className="mt-2 text-left">
              <p className="mt-2 font-normal text-2xl">พิซซ่าชีสเยิ้ม</p>
              <p className="mt-2 text-xl font-bold">฿159</p>
            </div>
          </div>{' '}
          <div className="flex flex-col items-start rounded-lg bg-white ">
            <Image
              src={CateglorySanwish}
              alt="product1"
              width={250}
              height={250}
                            className="object-cover h-full w-full"

            />
            <div className="mt-2 text-left">
              <p className="mt-2 font-normal text-2xl">พิซซ่าชีสเยิ้ม</p>
              <p className="mt-2 text-xl font-bold">฿159</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: 'โปรโมชั่น',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'เบอร์เกอร์',
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: 'พิซซ่า',
      children: 'Content of Tab Pane 4',
    },
    {
      key: '5',
      label: 'แซนวิช',
      children: 'Content of Tab Pane 4',
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

  const onChange = (key: string) => {
    console.log('categlories in context: ',key);
  };

  return (
    <main className="p-6 bg-white">
      <div className="flex flex-row items-center mb-4 relative">
        <div className="w-[45px] flex-shrink-0">
          <Image src={BackIcon} alt="BackIcon" width={45} height={45} />
        </div>
        <h1 className="flex-1 text-2xl text-black font-bold text-center">
          หมวดหมู่
        </h1>
        <div className="w-[45px] flex-shrink-0 flex justify-end">
          <Image src={ShareIcon} alt="ShareIcon" width={45} height={45} />
        </div>
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </main>
  );
}
