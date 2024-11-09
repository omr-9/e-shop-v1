'use client'
import { HeartIcon, } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import FavSidebar from './FavSidebar'

const AddToFav = () => {
    const items = useSelector((state:RootState) => state.favorites.items)
    // const totalQuantity = items.reduce((total, item) => total+item ,0)
    const totalQuantity = items.length
  return (
    <Sheet>
    <SheetTrigger>

    <div className='relative'>
      <span className=' absolute -top-3 -right-3  bg-red-500 rounded-full text-white w-6 text-center h-6 '>{totalQuantity}</span>
      <HeartIcon size={26} cursor={'pointer'}/>
    </div>
    </SheetTrigger>
    <SheetContent className='overflow-auto h-full'>
      {/* <CartSidebar items={items} /> */}
      <FavSidebar items={items} />
    </SheetContent>

  </Sheet>
  )
}

export default AddToFav
