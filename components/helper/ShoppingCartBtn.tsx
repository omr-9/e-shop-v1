'use client'
import { RootState } from '@/store/store'
import {  ShoppingBag } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const ShoppingCartBtn = () => {
  const items = useSelector((state:RootState) => state.Cart.items)
  const totalQuantity = items.reduce((total, item) => total+item.quantity ,0)
  return (
  
      <div className='relative'>
        <span className=' absolute -top-3 -right-3  bg-red-500 rounded-full text-white w-6 text-center h-6 '>{totalQuantity}</span>
        <ShoppingBag size={26} cursor={'pointer'}/>
      </div>
  
  )
}

export default ShoppingCartBtn
