
import Link from "next/link";
import { Button, Dropdown } from "flowbite-react";
import { useContext } from "react";
import { CartContext } from "./CartContext";
export default function Header() {
  const {cartProducts} = useContext(CartContext)
  return (
    <header className="flex flex-col p-2 bg-white ">
      {/* sección superior del header*/}
      <div className="flex justify-between px-6 py-4">
        {/* Logo de la tienda*/}
        <Link
          href={"/"}
          className="flex gap-2 items-center text-2xl font-bold text-blue-700 drop-shadow-lg"
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.4673 1.91309H37.1847C40.9486 1.91309 43.9999 5.28555 43.9999 9.44569V34.5544C43.9999 38.7145 40.9486 42.087 37.1847 42.087H14.4673C10.7034 42.087 7.6521 38.7145 7.6521 34.5544L7.6521 9.44569C7.6521 5.28555 10.7034 1.91309 14.4673 1.91309Z"
                fill="#0D6EFD"
                fillOpacity="0.2"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.13046 1.91309H32.0435C36.0055 1.91309 39.2174 5.28555 39.2174 9.44569V34.5544C39.2174 38.7145 36.0055 42.087 32.0435 42.087H8.13046C4.16841 42.087 0.956542 38.7145 0.956543 34.5544L0.956543 9.44569C0.956543 5.28555 4.16841 1.91309 8.13046 1.91309Z"
                fill="#0D6EFD"
              />
              <g opacity="0.7">
                <path
                  opacity="0.3"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.2902 18.3562H14.3097C14.2592 18.3562 14.1842 18.4265 14.1813 18.473L13.459 30.1476L26.9549 30.1451L26.2254 18.473C26.2226 18.4283 26.1458 18.3562 26.097 18.3562H25.1165V20.3214C25.1165 20.8641 24.6765 21.3041 24.1338 21.3041C23.5912 21.3041 23.1512 20.8641 23.1512 20.3214V18.3562H17.2555V20.3214C17.2555 20.8641 16.8156 21.3041 16.2729 21.3041C15.7302 21.3041 15.2902 20.8641 15.2902 20.3214V18.3562Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.2033 11.4783C22.9153 11.4783 25.1164 13.6796 25.1164 16.3891L26.0969 16.3914C27.1835 16.3914 28.1192 17.2704 28.1867 18.3508L28.9244 30.1539C28.9921 31.2361 28.1698 32.1133 27.0865 32.1133H13.3201C12.2374 32.1133 11.4146 31.2344 11.4821 30.1539L12.2198 18.3508C12.2875 17.2686 13.2213 16.3914 14.3096 16.3914H15.2902C15.2902 13.6781 17.493 11.4783 20.2033 11.4783ZM23.1511 16.3915C23.1511 14.765 21.8299 13.4436 20.2033 13.4436C18.5778 13.4436 17.2554 14.7642 17.2554 16.3892L23.1511 16.3915ZM15.2902 18.3566H14.3096C14.2591 18.3566 14.1842 18.4269 14.1813 18.4733L13.4589 30.148L26.9548 30.1455L26.2253 18.4733C26.2225 18.4286 26.1457 18.3566 26.0969 18.3566H25.1164V20.3218C25.1164 20.8645 24.6765 21.3044 24.1338 21.3044C23.5911 21.3044 23.1512 20.8645 23.1512 20.3218V18.3566H17.2554V20.3218C17.2554 20.8645 16.8155 21.3044 16.2728 21.3044C15.7301 21.3044 15.2902 20.8645 15.2902 20.3218V18.3566Z"
                  fill="white"
                />
              </g>
            </g>
          </svg>
          Bianvi Store
        </Link>
        {/* Barra de búsqueda*/}
        <div className="flex border-blue-600 border-2 rounded-md overflow-hidden w-fit font-semibold">
          <input
            className="p-2 focus:outline-none  border-r-2 border-blue-600"
            type="text"
          />
          <select className=" flex items-center outline-none px-4">
            <option value={0}>Categorías</option>
          </select>
          <button className="bg-blue-500 text-white h-full px-6 block">
            Buscar
          </button>
        </div>
        {/* Sección ingresar o Perfil*/}
        <div className="flex gap-4">
          {/* Ingresar - registrarse cuando no exista session  cuando si lo de abajo*/}
          <Link href={"/account"} className="flex flex-col items-center text-gray-400 font-semibold">
            
            <svg
              width="21"
              height="21"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 11.5C6.6625 11.5 0 13.175 0 16.5V17.75C0 18.4375 0.5625 19 1.25 19H18.75C19.4375 19 20 18.4375 20 17.75V16.5C20 13.175 13.3375 11.5 10 11.5Z"
                fill="#8B96A5"
              />
            </svg>
            Cuenta
          </Link>

          <Link href={"/cart"} className="flex flex-col items-center text-gray-400 font-semibold">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.29989 16.7997C5.14491 16.7997 4.21043 17.7447 4.21043 18.8997C4.21043 20.0546 5.14491 20.9996 6.29989 20.9996C7.45487 20.9996 8.39985 20.0546 8.39985 18.8997C8.39985 17.7447 7.45487 16.7997 6.29989 16.7997ZM0 1.04998C0 1.62747 0.472492 2.09996 1.04998 2.09996H2.09996L5.8799 10.0693L4.46242 12.6313C3.69593 14.0383 4.70392 15.7497 6.29989 15.7497H17.8497C18.4272 15.7497 18.8997 15.2772 18.8997 14.6997C18.8997 14.1223 18.4272 13.6498 17.8497 13.6498H6.29989L7.45487 11.5498H15.2772C16.0647 11.5498 16.7577 11.1193 17.1147 10.4683L20.8736 3.65394C21.2621 2.96095 20.7581 2.09996 19.9601 2.09996H4.42042L3.71693 0.598489C3.54894 0.230996 3.17094 0 2.77195 0H1.04998C0.472492 0 0 0.472492 0 1.04998ZM16.7997 16.7997C15.6447 16.7997 14.7102 17.7447 14.7102 18.8997C14.7102 20.0546 15.6447 20.9996 16.7997 20.9996C17.9547 20.9996 18.8997 20.0546 18.8997 18.8997C18.8997 17.7447 17.9547 16.7997 16.7997 16.7997Z"
                fill="#8B96A5"
              />
            </svg>
            Carrito {cartProducts.length}
          </Link>
        </div>
      </div>
      {/* Sección inferior del header*/}
      <div className="border-y-2 py-4 ">
        <nav className=" flex gap-8 font-semibold items-center px-4">
          <Link href={"/categories"} className="flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.9}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            Categorías
          </Link>
          <Link href={"/products"}> Todos los productos </Link>
          <Link href={"#"}> Ofertas </Link>
          <Link href={"#"}> SexShop +18 </Link>
          <Link href={"#"}> Extra ...</Link>
        </nav>
      </div>
    </header>
  );
}
