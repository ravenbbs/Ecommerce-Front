import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    } else {
      setCartProducts([]);
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        // Encuentra la primera ocurrencia del producto y elimínala
        prev.splice(pos, 1);
      }
  
      if (prev.length === 0) {
        // Si el carrito está vacío, elimina la clave del carrito del Local Storage
        localStorage.removeItem('cart');
      } else {
        // Si el carrito no está vacío, actualiza el Local Storage con el carrito actualizado
        localStorage.setItem('cart', JSON.stringify(prev));
      }
  
      return [...prev]; // Devuelve una nueva referencia del carrito actualizado
    });
  }
  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}
