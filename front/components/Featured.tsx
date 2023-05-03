import React, { useContext } from 'react'
import Center from './Center'
import Button from './Button'
import ButtonLink from './ButtonLink'
import { Product } from '@/models/Product'
import CartIcon from './icons/CartIcon'
import { CartContext } from './CartContext'

type Props = {
  product: typeof Product
}

const Featured = ({product} : Props) => {
  const { addProduct } = useContext(CartContext);

  return (
    <div className= 'bg-black text-white p-0'>
      <Center>
        <div className='flex gap-4 p-4 justify-between'>
          
          {/* ITEM INFO */}
          <div className='flex items-center w-1/2'>
            <div>
              <h1 className='m-0 font-normal text-4xl'>{product.title}</h1>
              <p className='text-gray-300 text-sm mb-4 mt-2'>
                {product.description}
              </p>

              <div className='flex gap-2'>
                <ButtonLink href={`/products/${product._id}`} outline primary size="l">Read More</ButtonLink>
                <Button primary size="l" onClick={() => addProduct(product._id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </div>
          </div>

          {/* ITEM PICTURE */}
          <div className='flex items-center w-1/2'>
            <img className='w-full' src={product.images[0]}>
            </img>
          </div>
        </div>
      </Center>
    </div>
  )
}

export default Featured