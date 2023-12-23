import { CartContext } from "@/components/CartContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

export default function FacturaPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

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
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son de 0 a 11, por lo que sumamos 1
  const anio = fechaActual.getFullYear() % 100; // Obtiene los dos últimos dígitos del año

  // Asegura que el día y el mes tengan dos dígitos
  const diaFormateado = dia < 10 ? `0${dia}` : dia;
  const mesFormateado = mes < 10 ? `0${mes}` : mes;

  const fechaFormateada = `${mesFormateado}/${diaFormateado}/${anio}`;

  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    productsTotal += price;
  }

  if (session) {
    return (
      <>
        <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-3xl mx-auto">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center">
              <button onClick={() => window.print()}>
                <svg
                  class="h-12 w-12 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z" />
                </svg>
              </button>
              <div class="text-gray-700 font-semibold text-lg">Bianvi</div>
            </div>
            <div class="text-gray-700">
              <div class="font-bold text-xl mb-2">Factura</div>
              <div class="text-sm">Fecha: {fechaFormateada}</div>
              <div class="text-sm">#: INV00005</div>
            </div>
          </div>
          <h2 class="text-2xl font-bold mb-4">Datos:</h2>
          <div class="border-b-2 border-gray-300 pb-4 mb-4 grid grid-cols-2">
            <div class="text-gray-700 mb-2 ">{name}</div>
            <div class="text-gray-700 mb-2 ">
              {city}, EC {postalCode}
            </div>
            <div class="text-gray-700 ">{email}</div>
            <div class="text-gray-700 mb-2 ">{streetAddress}</div>
          </div>
          <table class="w-full text-left mb-3">
            <thead>
              <tr>
                <th class="text-gray-700 font-semibold py-2">Description</th>
                <th class="text-gray-700 font-semibold  py-2">Cantidad</th>
                <th class="text-gray-700 font-semibold py-2">Precio</th>
                <th class="text-gray-700  font-semibold py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 && (
                <>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b-2">
                      <td class="py-2 text-gray-700">{product.title}</td>
                      <td class="py-2 text-gray-700 text-center">
                        {" "}
                        {cartProducts.filter((id) => id === product._id).length}
                      </td>
                      <td class="py-2 text-gray-700">
                        ${product.price.toFixed(2)}
                      </td>
                      <td class="py-2 text-gray-700">
                        $
                        {(
                          product.price *
                          cartProducts.filter((id) => id === product._id).length
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
          <div class="flex justify-end mb-2">
            <div class="text-gray-700 mr-2">Subtotal:</div>
            <div class="text-gray-700">${productsTotal.toFixed(2)}</div>
          </div>
          <div class="flex justify-end mb-2">
            <div class="text-gray-700 mr-2">Gestión envíos: </div>
            <div class="text-gray-700"> $5.50</div>
          </div>
          <div class="flex justify-end mb-2">
            <div class="text-gray-700 mr-2">Total:</div>
            <div class="text-gray-700 font-bold text-xl">
              ${(productsTotal + 5.5).toFixed(2)}
            </div>
          </div>
          <div class="border-t-2 border-gray-300 pt-8 mb-8">
            <div class="text-gray-700 mb-2">
              La gestión de los productos depende si sobrepasan cantidad y peso.
            </div>
            <div class="text-gray-700 mb-2 print:hidden">
              Para compras por mayor, contactar <a href="#">aquí</a>
            </div>
            <div class="text-gray-700">
              Guardar el documento y enviarlo a un asesor, este gestionara su
              pedido.
            </div>
            <button
              className="print:hidden mt-6 block font-bold px-4 py-2  mx-auto rounded-md hover:scale-105 transition-all my-1 shadow-sm bg-blue-200 text-blue-600 "
              onClick={() => window.print()}
            >
              Imprimir Factura
            </button>
          </div>
        </div>
      </>
    );
  }
}
