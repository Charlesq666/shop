import React, { useEffect } from 'react'
import Link from "next/link"
import Center from './Center'
import { useContext } from 'react'
import { CartContext } from './CartContext'

const Header = () => {
  const {cartProducts} = useContext(CartContext)

  return (
    <header className='bg-black py-4'>
      <Center>
        <div className='flex justify-between px-2 py-0 w-full'>
          <Link href={'/'} className='ml-10 text-3xl font-konkhmer text-gray-100'>VAPE!</Link>
          <nav className='flex items-center justify-center gap-6 text-gray-300 pr-10'>
            <Link href={'/'}>Home</Link> 
            <Link href={'/products'}>All Products</Link>
            <Link href={'/categories'}>Categories</Link>
            <Link href={'account'}>Account</Link>
            <Link href={'/cart'}>Cart ({cartProducts.length})</Link>
          </nav>
        </div>
      </Center>
    </header>
  )
}

export default Header