import { createContext, useState, useEffect } from "react"
import React from "react"

export const CartContext = createContext({})

type Props = {
  children: React.ReactNode
}

export function CartContextProvider ({ children } : Props) {
  const ls = typeof window !== 'undefined' ? window.localStorage : null; 
  const defaultProducts = ls ? JSON.parse(ls?.getItem('cartProducts')) : []
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem('cartProducts', JSON.stringify(cartProducts))
    }
  }, [cartProducts])

  useEffect(() => {
    if (ls && ls.getItem('cartProducts')) {
      setCartProducts(JSON.parse(ls.getItem('cartProducts')))
    }
  }, [])

  function addProduct(productId: string) {
    setCartProducts(prev => [...prev, productId])
  }
  
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct}}>
      {children}
    </CartContext.Provider>
  )
}

