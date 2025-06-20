'use client';

import Image from 'next/image';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import BackIcon2 from '@/assets/icons/back-icon2.svg';
import burgur1 from '@/assets/icons/burgur-1.jpg';
import { useCartStore } from '@/utils/cartStore';
import { useRouter } from 'next/navigation';


const product = 
  {
    id: 'menu-001',
    name: 'เบอร์เกอร์ชีสลาวา',
    description: 'เบอร์เกอร์เนื้อ ใส่ชีสใส่ ผักใส่มะเขือเทศ',
    price: 100,
    image: burgur1,
    category: 'Burgers',
    is_active: true,
    addition_types: [
      {
        id: 'type-soda',
        name: 'เครื่องเคียง',
        max_select: 3,
        additions: [
          { id: 'add-001', name: 'Coca Cola 400ml', price: 30, selected: false },
          { id: 'add-002', name: 'Pepsi 250ml', price: 20, selected: false },
          { id: 'add-003', name: 'Sprite 200ml', price: 15, selected: false },
        ],
      },
      {
        id: 'type-topping',
        name: 'ท็อปปิ้ง',
        max_select: 3,
        additions: [
          { id: 'add-004', name: 'ไข่ดาว', price: 20, selected: false },
          { id: 'add-005', name: 'แตงกวาดอง', price: 10, selected: false },
          { id: 'add-006', name: 'เฟรนฟรายด์', price: 15, selected: false },
          { id: 'add-007', name: 'ข้าวเหนียว', price: 15, selected: false },
        ],
      },
    ],
  }
;

export default function DetailPage() {
  const { addToCart } = useCartStore();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [totalprice, setTotalPrice] = useState(product.price);
  const [note, setNote] = useState('');
  const [additionTypes, setAdditionTypes] = useState(() =>
    JSON.parse(JSON.stringify(product.addition_types))
  );

  const handleCheckboxChange = (typeId: string, addId: string) => {
    setAdditionTypes((prev: any[]) =>
      prev.map((type) => {
        if (type.id !== typeId) return type;
        const selectedCount = type.additions.filter((a: { selected: any; }) => a.selected).length;

        return {
          ...type,
          additions: type.additions.map((add: { id: string; selected: any; }) => {
            if (add.id !== addId) return add;
            if (!add.selected && selectedCount >= type.max_select) return add;
            return { ...add, selected: !add.selected };
          }),
        };
      })
    );
  };

  const handleAddToCart = () => {
    const selectedTypes = additionTypes.map((type: { additions: any[]; }) => ({
      ...type,
      additions: type.additions.filter((add: { selected: any; }) => add.selected),
    }));

    addToCart({
      ...product,
      quantity,
      note,
      addition_types: selectedTypes,
    });
    console.log('เพิ่มสินค้าในตะกร้า:', {
      ...product,
      quantity,
      note,
      addition_types: selectedTypes,
    });
    setQuantity(1);
    setNote('');
    setAdditionTypes(() =>
      JSON.parse(JSON.stringify(product.addition_types))
    );
    setTotalPrice(product.price);
    router.push('/menu');
  };

  const calculateTotalPrice = () => {
    const basePrice = product.price;
    const additionsPrice = additionTypes.reduce((sum: any, type: { additions: any[]; }) => {
      const selectedAdds = type.additions.filter((add) => add.selected);
      const typeTotal = selectedAdds.reduce((t, add) => t + add.price, 0);
      return sum + typeTotal;
    }, 0);

    return (basePrice + additionsPrice) * quantity;
  };

  return (
    <div className="max-w-md mx-auto min-h-screen font-sans pb-36">
      {/* รูปภาพพร้อมชื่อ overlay */}
      <div className="relative w-full h-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'cover', transform: 'scale(1.2)' }}
        />
        <div className="absolute inset-0 bg-black opacity-10 rounded-b-2xl z-0" />
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <Image
            src={BackIcon2}
            alt="Back"
            width={30}
            height={24}
            className="cursor-pointer"
            onClick={() => router.push('/menu')}
            
          />
          <h1 className="text-white text-3xl font-bold drop-shadow-lg text-center flex-1">
            {product.name}
          </h1>
          <div style={{ width: '24px' }} />
        </div>
      </div>

      <div className="p-4">
        {/* รายละเอียดสินค้า */}
        <div>
          <div className="flex flex-row justify-between items-center ">
            <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
            <h2 className="text-2xl font-bold mb-1 text-yellow-500">
              {product.price} ฿
            </h2>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <hr className="mb-4" />
        </div>

        {/* ตัวเลือกเพิ่มเติม */}
        {additionTypes.map((type: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; max_select: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; additions: { id: Key | null | undefined; selected: boolean | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }[]; }) => (
          <div key={type.id} className="mb-6">
            <h3 className="font-semibold text-lg mb-1">
              {type.name}
              <span className="ml-2 text-sm text-gray-400">
                เลือกได้สูงสุด {type.max_select} อย่าง
              </span>
            </h3>
            <ul>
              {type.additions.map((add: { id: Key | null | undefined; selected: boolean | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
              <li
                key={add.id}
                className="flex items-center justify-between mb-1 select-none"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={add.selected}
                  onChange={() => handleCheckboxChange(type.id as any, add.id as any)}
                  className="w-4 h-4 accent-[#D7284E]"
                />
                <span >{add.name}</span>
                </label>
                <span >฿{add.price}</span>
              </li>
              ))}
            </ul>
            <hr className="mt-4" />
          </div>
        ))}

        {/* รายละเอียดเพิ่มเติม */}
        <div className="mb-6">
          <label htmlFor="details" className="block font-semibold mb-2">
            รายละเอียดเพิ่มเติม
          </label>
          <textarea
            id="details"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="เช่น ไม่เอาผัก"
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* จำนวนและใส่ตระกร้า */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded border border-gray-400 flex items-center justify-center text-xl font-bold"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded border border-gray-400 flex items-center justify-center text-xl font-bold"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-red-600 text-white rounded px-6 py-2 font-semibold"
          >
            ใส่ตระกร้า ฿ {calculateTotalPrice()}
          </button>
        </div>
      </nav>
    </div>
  );
}
