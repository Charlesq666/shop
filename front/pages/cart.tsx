import Button from '@/components/Button'
import Center from '@/components/Center'
import Header from '@/components/Header'
import React from 'react'

const CartPage = () => {
  return (
    <>
      <Header />

      {/* COLUMNS WRAPPER */}
      <div className='flex items-center justify-center'>
        <div className='w-[80%] grid grid-cols-[1.3fr,0.7fr] gap-8 mt-10'>
          <div className='bg-white rounded-xl p-10'>
            <h2>Cart</h2>
          </div>

          <div className='bg-white rounded-xl p-10'>
            <h2>Order information</h2>
            <Button size={'l'} white outline> continue to pay</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartPage