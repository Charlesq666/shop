import React from 'react'
import Center from './Center'
import Button from './Button'
import ButtonLink from './ButtonLink'
import { Product } from '@/models/Product'

type Props = {
  product: typeof Product
}

const Featured = ({product} : Props) => {
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
                <ButtonLink href={`/products/${product._id}`} outline white size="l">Read More</ButtonLink>
                <Button primary size="l">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                  </svg>
                  Add to cart
                </Button>
              </div>
            </div>
          </div>

          {/* ITEM PICTURE */}
          <div className='flex items-center w-1/2'>
            <img className='w-full' src="https://shop732187.s3.us-east-2.amazonaws.com/1682398547597.jpg">
            </img>
          </div>
        </div>
      </Center>
    </div>
  )
}

export default Featured