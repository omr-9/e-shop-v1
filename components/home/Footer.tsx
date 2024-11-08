import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='pt-20 pb-12'>
      <div className='w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b-[1.2px] border-b-slate-500 pb-8'>
        <div>
        <Image
            src="/images/e-shop.png"
            width={140}
            height={140}
            alt=" logo" 
            className='object-contain'
          ></Image>
            <p className='text-black opacity-50 text-sm '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore ipsum atque alias tenetur est consequuntur obcaecati, eaque voluptate, omnis voluptas provident, culpa libero? Maxime quos tempore cupiditate. Consequatur, reprehenderit aut.</p>
            <p className='mt-4 text-black text-base opacity-80'>123456789 - info@example.com

            </p>
        </div>
        <div className='lg:mx-auto'>
            <h1 className='footer__title'>Information</h1>
            <p className='footer__link '>About Us</p>
            <p className='footer__link '>Pricacy Police</p>
            <p className='footer__link '>Return Police</p>
            <p className='footer__link '>Dropshopping</p>
            <p className='footer__link '>Shopping Police</p>
        </div>
        <div className='lg:mx-auto'>
            <h1 className='footer__title'>Account</h1>
            <p className='footer__link '>Dashboard</p>
            <p className='footer__link '>My Order</p>
            <p className='footer__link '>Account Details</p>
            <p className='footer__link '>Track Orders</p>
        </div>
        <div className='lg:mx-auto'>
            <h1 className='footer__title'>Shop</h1>
            <p className='footer__link '>Affiliate</p>
            <p className='footer__link '>Best Sallers</p>
            <p className='footer__link '>Latest Products</p>
            <p className='footer__link '>Sale Products</p>
        </div>
      </div>
      <div className='mt-8 gap-6 grid grid-cols-1 sm:grid-cols-2 justify-between w-4/5 mx-auto'>
      <p className='text-sm text-black opacity-75'>&copy; Copyright webdevwarriors 2024 </p>
      <Image src='/images/pay.svg' className='object-contain sm:ml-auto' width={220} height={220} alt='pay image'/>

      </div>
    </div>
  )
}

export default Footer
