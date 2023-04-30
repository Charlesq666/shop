import React from 'react'
import { Product } from '@/models/Product'
import Center from './Center'
import ProductBox from './ProductBox'

type Props = {
  products: typeof Product[]
}

const NewProducts = ( {products} : Props) => {
  return (
    <div className='grid grid-cols-4 gap-2 pt-2'>
      {products?.length > 0 && products.map((product) => (
        <ProductBox product={product} key={product._id}/>
      ))}
    </div>
  )
}

export default NewProducts