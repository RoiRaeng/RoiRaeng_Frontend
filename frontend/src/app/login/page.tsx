import React from 'react'
import { Input } from 'antd';
// import Icon from './public/icon/globe.svg'
// D:\Roi Raeng\Frontend\frontend\public\globe.svg

function LoginPage() {
  return (
    <div className='min-h-screen w-full bg-[#DB3B5E]'>
      <h3 className='text-2xl text-white font-bold'>เข้าสู่ระบบ</h3>
      <Input 
        size='large' 
        // addonAfter={Icon}
        placeholder='ชื่อผู้ใช้' 
        className='bg-red-500'>
      </Input>
    </div>
  )
}

export default LoginPage