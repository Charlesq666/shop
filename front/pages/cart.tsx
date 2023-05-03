import Button from '@/components/Button'
import Center from '@/components/Center'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '@/components/CartContext'
import axios from 'axios'

const CartPage = () => {
  const {cartProducts, addProduct, removeProduct} = useContext(CartContext)
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [country, setCountry] = useState('')

  useEffect(()=>{
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids: cartProducts})
        .then(res => {
          setProducts(res.data)
        })
    } else {
      setProducts([])
    }
  }, [cartProducts])

  let total = 0
  for (let i = 0; i < products.length; i++) {
    total += products[i].price * cartProducts.filter((id) => id === products[i]._id).length
  }

  return (
    <>
      <Header />

      {/* COLUMNS WRAPPER */}
      <div className='flex items-center justify-center'>
        <div className='w-[90%] grid grid-cols-[1.6fr,0.7fr] gap-6 mt-10'>
          <div className='bg-white rounded-xl p-10'>
            <h2>Cart</h2>
            {!cartProducts.length && (
              <div>Cart is empty</div>
            )}

            {/* CART ITEMS */}
            {products?.length > 0 && (
              <table className='basic'>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr>
                      <td>
                        <div className='mt-2 max-h-[100px] max-w-[100px] p-1 rounded border'>
                          <img src={product.images[0]}/>
                        </div>

                        <div className='max-w-[200px]'>
                          {product.title}
                        </div>
                      </td>
                      <td>
                        <Button onClick={ () => removeProduct(product._id)}>-</Button> 
                        {cartProducts.filter((id) => id === product._id).length}
                        <Button onClick={ () => addProduct(product._id)}>+</Button>
                      </td>
                      <td>${(cartProducts.filter((id) => id === product._id).length * product.price).toFixed(3)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>Total: ${total.toFixed(3)}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* ORDER CONFIRMATION */}
          {!!cartProducts.length && (
            <div className='bg-white rounded-xl p-10'>
              <h2 className='w-full m-2 text-center'>Order information</h2>
              <div className='flex flex-col items-center justify-center gap-2'>
                <form method='post' action='/api/checkout'>
                  <input className='basic' type='text' placeholder='Name' value={name} name='name' onChange={e=>setName(e.target.value)}/>
                  <input className='basic' type='text' placeholder='Email'value={email} name='email' onChange={e=>setEmail(e.target.value)}/>
                  <div className='flex gap-2'>
                    <input className='basic' type='text' placeholder='City' value={city} name='city' onChange={e=>setCity(e.target.value)}/>
                    <input className='basic' type='text' placeholder='Postal Code' value={postalCode} name='postalCode' onChange={e=>setPostalCode(e.target.value)}/>
                  </div>
                  <input className='basic' type='text' placeholder='Street Address' value={streetAddress} name='streetAddress' onChange={e=>setStreetAddress(e.target.value)}/>
                  <input className='basic' type='text' placeholder='Country' value={country} name='country' onChange={e=>setCountry(e.target.value)}/>
                  <input type='hidden' name='products' value={JSON.stringify(cartProducts)}/>
                  <Button black block type='submit'>Continue to pay</Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartPage