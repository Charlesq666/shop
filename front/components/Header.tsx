import React from 'react'
import Link from "next/link"
import Center from './Center'

const Header = () => {
  return (
    <header className='bg-black py-4'>
      <Center>
        <div className='flex justify-between px-2 py-0 w-full'>
          <Link href={'/'} className='ml-10 text-xl text-white'>Ecommerce</Link>
          <nav className='flex gap-6 text-gray-300 pr-10'>
            <Link href={'/'}>Home</Link> 
            <Link href={'/products'}>All Products</Link>
            <Link href={'/categories'}>Categories</Link>
            <Link href={'account'}>Account</Link>
            <Link href={'/cart'}>Cart (0)</Link>
          </nav>
        </div>
      </Center>
    </header>
  )
}

export default Header