import React from "react";
import { Input, Checkbox, Button } from "antd";
import UserIcon from "@/assets/icons/user-icon.svg";
import LockIcon from "@/assets/icons/lock-icon.svg";
import Burger from "@/assets/icons/burgur-1.jpg";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div>
      <div className="flex min-h-screen w-full bg-[#DB3B5E]">
        <div className="w-1/2 p-4 sm:p-8 md:p-12 lg:p-16 xl:p-40 flex flex-col justify-center items-center gap-6">
          <h3 className="text-3xl text-white font-bold pb-4">เข้าสู่ระบบ</h3>
          <Input
            size="large"
            placeholder="ชื่อผู้ใช้"
            className="!bg-white/10 !rounded-[16px] !h-[50px] !text-white"
            suffix={<Image src={UserIcon} alt="user-icon" height={20} />}
          ></Input>

          <Input
            size="large"
            placeholder="รหัสผ่าน"
            className="!bg-white/10 !rounded-[16px] !h-[50px] !text-white"
            suffix={<Image src={LockIcon} alt="user-icon" height={20} />}
          ></Input>

          <div className="flex justify-between w-full">
            <Checkbox className="text-sm !text-white">จดจำผู้ใช้</Checkbox>
            <a href="/login/forgot-password" className="text-sm text-white">
              ลืมรหัสผ่าน
            </a>
          </div>

          <button className="w-full bg-white text-black font-bold py-2 rounded-xl h-[50px]">
            <a href="/navbar">เข้าสู่ระบบ</a>
            
          </button>
        </div>

        <div className="w-1/2">
          <Image src={Burger} alt="user-icon" className="w-full h-full rounded-tl-[50px]" />
        </div>
      </div>
    </div>
  );
}