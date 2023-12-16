import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  return (
    <>
      <Header hidden={" hidden"} />

      <section class="grid grid-cols-2 pt-12 px-4 gap-5">
        <div class="bg-white shadow rounded-lg  w-full max-w-md pt-6 ">
          <h2>Carrito</h2>
          {!cartProducts.length && (
            <div className="w-full h-20 text-center py-6 font-semibold text-xl">
              El carrito esta vació
            </div>
          )}

          {products.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Productos</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr>
                    <td>
                      <img className="w-12 h-12" src={product.images[0]}>  </img>
                      {product.title}
                      </td>
                    <td>
                      {" "}
                      {cartProducts.filter((id) => id === product._id).length}
                    </td>{" "}
                    <td>${product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!!cartProducts.length && (
          <div className="bg-white shadow rounded-lg h-20 w-full max-w-md">
            dsd
          </div>
        )}
      </section>
    </>
  );
}
