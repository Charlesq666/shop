import React from 'react'
import { Product } from '@/models/Product'

type Props = {
  product: typeof Product
}

const ProductBox = ( {product} : Props) => {
  return (
    <div>
      <div className='bg-white p-2 h-[150px] w-30 text-center flex items-center justify-center border rounded-md'>
        <img 
          className='max-h-full max-w-full'
          src={product.images[0]}>
        </img>
      </div>

      {product.title}
    </div>
  )
}

export default ProductBox