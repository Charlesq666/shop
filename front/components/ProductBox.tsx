import React from 'react'
import { Product } from '@/models/Product'
import Button from './Button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { CartContext } from './CartContext'

type Props = {
  product: typeof Product
}

const ProductBox = ( {product} : Props) => {
  const uri = `product/${product._id}`
  const { addProduct } = useContext(CartContext);

  return (
    <div className='border rounded-lg shadow-md'>
      {/* PRODUCT IMAGE */}
      <Link href={uri} className='bg-white p-2 h-[300px] w-30 text-center flex items-center justify-center'>
        <img 
          className='max-h-[90%] max-w-full'
          src={product.images[0]}>
        </img>
      </Link>
      
      {/* PRODUCT INFO BOX */}
      <div className='p-2'>
        {/* PRODUCT TITLE */}
        <div className='h-[70px]'>
          <Link href={uri} className='font-lg font-normal truncate-lines-3'> {product.title} </Link>
        </div>

        <div className='flex items-center justify-between mt-2'>
          <div className='text-lg font'>
            ${product.price}
          </div>

          <Button white outline onClick={() => addProduct(product._id)}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductBox