import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, productId } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  function moreOfThisProduct(id){
    addProduct(id)
  }
  function lessOfThisProduct(id){
    removeProduct(id)
  }
  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    productsTotal += price;
  }

  return (
    <>
      <Header hidden={"hidden"} />

      <section className="mb-6 flex pt-12 px-4 gap-5 max-md:grid-cols-1 max-md:grid justify-center ">
        <div className=" bg-white shadow rounded-lg  w-full max-w-2xl pt-6 max-md:mx-auto px-4 ">
          <h2 className="text-2xl font-bold mb-6 mx-4">Carrito</h2>
          {!cartProducts.length && (
            <div
              key={cartProducts.length}
              className="w-full h-20 text-center py-6 font-semibold text-xl"
            >
              El carrito esta vació
            </div>
          )}

          {products.length > 0 && (
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-left border-b-2">
                  <th>Productos</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-center">Precio</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className=" border-b-2  ">
                    <td className="flex">
                      <div className="mt-2">
                        <img
                          className=" border-2  p-2 rounded-md lg:w-40 w-32 max-h-40 max-sm:w-20"
                          src={product.images[0]}
                          alt={`${product.title} thumbnail`}
                        />
                        <h1 className="py-1 font-semibold my-2">
                          {product.title}
                        </h1>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="font-bold">
                      <button 
                      onClick={() => moreOfThisProduct(product._id)}
                      
                      className="border-2 rounded-s-md w-6 border-gray-300">+</button> 
                        <span className="mx-1">{cartProducts.filter((id) => id === product._id).length}</span>
                      <button 
                      onClick={() => lessOfThisProduct(product._id)}
                      className="border-gray-300 rounded-e-md border-2 w-6">-</button>
                        </div>             
                    </td>
                    <td className="text-center">
                      $
                      {(cartProducts.filter((id) => id === product._id).length *
                        product.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>{productsTotal}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {!!cartProducts.length && (
          <div className="bg-white shadow rounded-lg h-20 w-full max-w-2xl max-md:mx-auto">
            <Input />
          </div>
        )}
      </section>
    </>
  );
}
