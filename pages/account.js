import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useState } from "react";

export default function AccountPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const session = useSession();
  function logout() {
    signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  function login() {
    signIn("google");
  }

  function saveAddress(){
    const data = {name, email, city, postalCode, streetAddress }
    axios.put('/api/address', data)
  }


  return (
    <>
      <Header hidden={"hidden"} accountHidden={"hidden"} />
      <section className="mb-16 flex pt-12 px-4 gap-5 max-md:grid-cols-1 max-md:grid justify-center ">
        <RevealWrapper className=" bg-white shadow rounded-lg  w-full max-w-2xl pt-6 max-md:mx-auto px-4 "  delay={100} >
          <h1 className="mb-6 mx-4">Ordenes</h1>
        </RevealWrapper>
        <RevealWrapper className="bg-white shadow rounded-lg h-fit w-full max-w-xl max-md:mx-auto p-4 ">
          <h1 className=" mt-2 mx-4">Información de Cuenta</h1>
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
                className=" btn-default btn-blue font-semibold  text-gray-800  flex items-center w-full text-center"
              >
                Guardar
              </button>
            <hr className="border-gray-300 my-4" />
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
        </RevealWrapper>
      </section>
    </>
  );
}
