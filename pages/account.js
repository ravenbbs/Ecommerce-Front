import Header from "@/components/Header";
import Input from "@/components/Input";
import WishProductBox from "@/components/WishProductBox";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Lista de deseos");
  const [orders, setOrders] = useState([]);

  function logout() {
    signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  function login() {
    signIn("google");
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode };
    axios.put("/api/address", data);
  }
  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);
    axios.get("/api/address").then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setAddressLoaded(true);
    });
    axios.get("/api/wishlist").then((response) => {
      setWishedProducts(response.data.map((wp) => wp.product));
      setWishlistLoaded(true);
    });
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setOrderLoaded(true);
    });
  }, [session]);
  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p._id.toString() !== idToRemove)];
    });
  }

  return (
    <>
      <Header hidden={"hidden"} accountHidden={"hidden"} />
      <section className="mb-16 flex pt-12 px-4 gap-5 max-md:grid-cols-1 max-md:grid justify-center ">
        <div className=" bg-white shadow rounded-lg  w-full max-w-2xl pt-6 max-md:mx-auto p-4 ">
          <Tabs
            editActive={"opacity-50"}
            tabs={["Lista de deseos", "Ordenes"]}
            active={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === "Ordenes" && (
            <>
              {!orderLoaded && <Spinner fullWidth={true} />}
              {orderLoaded && (
                <RevealWrapper>
                  {orders.length === 0 && <p>Login to see your orders</p>}
                  {orders.length > 0 &&
                    orders.map((o) => <SingleOrder {...o} />)}
                </RevealWrapper>
              )}
            </>
          )}

          {activeTab === "Lista de deseos" && (
            <RevealWrapper>
              <div className="flex flex-wrap gap-4 max-sm:justify-center p">
                {!wishlistLoaded && <Spinner fullWidth={true} />}

                {wishlistLoaded && (
                  <>
                    {wishedProducts.length > 0 &&
                      wishedProducts.map((wp) => (
                        <WishProductBox
                          key={wp._id}
                          {...wp}
                          wished={true}
                          onRemoveFromWishlist={productRemovedFromWishlist}
                        />
                      ))}
                    {wishedProducts.length === 0 && (
                      <>
                        {session && <p>Tu lista esta vacía</p>}
                        {!session && (
                          <p className="mb-6">
                            Inicia sesión para agregar productos a tu lista
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </RevealWrapper>
          )}
        </div>

        <div className="bg-white shadow rounded-lg h-fit w-full max-w-xl max-md:mx-auto p-4 ">
          <h1 className=" mt-2 mx-4">Detalles de la Cuenta</h1>
          {!addressLoaded && <Spinner fullWidth={true} />}
          {addressLoaded && session && (
            <RevealWrapper>
              <hr className="border-gray-300 my-4" />
              <Input
                type="text"
                placeholder="Nombres"
                name="name"
                defaultValue={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Correo"
                name="email"
                defaultValue={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Ciudad"
                name="city"
                defaultValue={city}
                onChange={(ev) => setCity(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Código Postal"
                name="postalCode"
                defaultValue={postalCode}
                onChange={(ev) => setPostalCode(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Dirección domicilio"
                name="streetAddress"
                defaultValue={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <button
                onClick={saveAddress}
                type="submit"
                className=" block font-bold px-4 py-2  mx-auto rounded-md hover:scale-105 transition-all my-1 shadow-sm bg-blue-200 text-blue-600  w-3/4 text-center  "
              >
                Guardar
              </button>
            </RevealWrapper>
          )}
          <RevealWrapper>
            {addressLoaded && !session && (
              <p className="text-center my-6">Se requiere iniciar sesión </p>
            )}
          </RevealWrapper>

          <hr className="border-gray-300 my-6" />
          {session && (
            <button
              onClick={logout}
              className="block font-bold px-4 py-2 mx-auto rounded-md hover:scale-105 transition-all my-1 shadow-sm bg-red-200 text-red-600 "
            >
              Cerrar Sesión
            </button>
          )}
          {!session && (
            <button
              onClick={login}
              className="block font-bold px-4 py-2  mx-auto rounded-md hover:scale-105 transition-all my-1 shadow-sm bg-blue-200 text-blue-600 "
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </section>
    </>
  );
}
