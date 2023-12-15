import {createContext, useEffect, useState} from "react"

export const CartContext = createContext({})

export function CartContextProvider({children}){
  function addProduct(productId){
    setCartProducts(prev => [...prev, productId])
  }
  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    if(cartProducts.length > 0){
      localStorage.setItem('cart', JSON)
    }
  }, [cartProducts])

  return(
    <CartContext.Provider value={{cartProducts, setCartProducts, addProduct}} >{children}</CartContext.Provider>
  )
}