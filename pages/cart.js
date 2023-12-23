import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { data: session } = useSession();
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // pasarela de pago
  const [shippingFee, setShippingFee] = useState(null);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
      localStorage.removeItem("cartProducts");
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get("/api/settings?name=shippingFee").then((res) => {
      setShippingFee(res.data.value);
    });
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get("/api/address").then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
    });
  }, [session]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    productsTotal += price;
  }

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  if (isSuccess) {
    return (
      <>
        <Header hidden={"hidden"} cartHidden={"hidden"} />
        <section className="mb-12 flex pt-12 px-4 gap-5 max-md:grid-cols-1 max-md:grid justify-center ">
          <div className=" text-center bg-white shadow rounded-lg  w-full max-w-2xl pt-6 max-md:mx-auto px-4 ">
            <h1 className="text-3xl my-4 font-semibold">
              Gracias por tu compra!
            </h1>
            <p className="my-6 font-semibold">
              Te contactaremos para informarte sobre tu pedido!
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header hidden={"hidden"} cartHidden={"hidden"} />
      <section className="mb-16 flex pt-12 px-4 gap-5 max-md:grid-cols-1 max-md:grid justify-center ">
        <div className=" bg-white shadow rounded-lg  w-full max-w-2xl pt-6 max-md:mx-auto px-4 ">
          <h1 className="mb-6 mx-4">Carrito</h1>
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
                        <h2 className="py-1 font-semibold my-2">
                          {product.title}
                        </h2>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="font-bold">
                        <button
                          onClick={() => moreOfThisProduct(product._id)}
                          className="border-2 rounded-s-md w-6 border-gray-300"
                        >
                          +
                        </button>
                        <span className="mx-1">
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </span>
                        <button
                          onClick={() => lessOfThisProduct(product._id)}
                          className="border-gray-300 rounded-e-md border-2 w-6"
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td className="text-center font-medium">
                      $
                      {(
                        cartProducts.filter((id) => id === product._id).length *
                        product.price
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Productos</td>
                  <td></td>
                  <td className="text-center font-semibold">
                    ${productsTotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>Gestión Envío</td>
                  <td></td>
                  <td className="text-center font-semibold">
                    ${parseFloat(shippingFee).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td className="text-center font-semibold">
                    ${(productsTotal + parseFloat(shippingFee)).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
                        {/*Aqui va para no poder comprar cuando no se haya inciado sesion  */}
        <div className="bg-white shadow rounded-lg h-fit w-full max-w-2xl max-md:mx-auto p-4 ">

        </div>

        {!!cartProducts.length && session && (
          <div className="bg-white shadow rounded-lg h-fit w-full max-w-2xl max-md:mx-auto p-4 ">
            <h1 className=" mt-2 mx-4">Información del pedido</h1>
            <hr className="border-gray-300 my-4" />
            <Input
                          disabled="true"

              type="text"
              placeholder="Nombres"
              name="name"
              defaultValue={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <Input
                          disabled="true"

              type="text"
              placeholder="Correo"
              name="email"
              defaultValue={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <Input
                          disabled="true"

              type="text"
              placeholder="Ciudad"
              name="city"
              defaultValue={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
            <Input
                          disabled="true"

              type="text"
              placeholder="Código Postal"
              name="postalCode"
              defaultValue={postalCode}
              onChange={(ev) => setPostalCode(ev.target.value)}
            />
            <Input
              disabled="true"
              type="text"
              placeholder="Dirección domicilio"
              name="streetAddress"
              defaultValue={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />

            <div className="flex justify-evenly">
              <button
              onClick={goToPayment} //aun no esta funcional la pasarela 
              href={'/factura'}
              className=" btn-default btn-blue  font-semibold  text-gray-800  flex items-center "
            >
              <a href={'/factura'}>
              Continuar con el pago
              </a>
            </button>
            {/* url tipo boton que redirige hacia la factura en caso de no querer pagar con tarjeta */}
            {/* <a
              href={'/factura'}
              className=" btn-default bg-green-200  font-semibold  text-green-900  flex items-center"
            >
              Generar Factura
            </a> */}
            <a
              href={'/account'}
              className=" btn-default bg-green-200  font-semibold  text-green-900  flex items-center"
            >
              Editar Información
            </a>
            </div>
            
          </div>
        )}
      </section>
    </>
  );
}
