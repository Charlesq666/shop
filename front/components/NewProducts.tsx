import React from 'react'
import { Product } from '@/models/Product'
import Center from './Center'
import ProductBox from './ProductBox'

type Props = {
  products: typeof Product[]
}

const NewProducts = ( {products} : Props) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='mx-4 my-5 max-w-[1400px]'>
        <div className='grid grid-cols-3 gap-4 pt-2'>
          {products?.length > 0 && products.map((product) => (
            <ProductBox product={product} key={product._id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewProducts