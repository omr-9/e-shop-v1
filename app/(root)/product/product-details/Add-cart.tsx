'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { addItem, CartItem } from '@/store/cartSlice'
import { Product } from '@/types'
import React from 'react'
import { useDispatch } from 'react-redux'

const AddToCart = ({product } : {product:Product}) => {
  const dispatch = useDispatch()
  const {toast} = useToast()
  const handleAddCart = () => {
    toast({
      description:'Item Added to Cart',
      variant:'success'
    })
    dispatch(addItem(product))}
  return (
   <Button onClick={() => handleAddCart()} className='mt-6 text-lg lg:text-xl'>Add To Cart</Button>
  )
}

export default AddToCart
