import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "./CartContext";


export default function Featured({ product }) {
const {addProduct} = useContext(CartContext)

function addFeaturedToCart(){
  addProduct(product._id)
}
  return (
    <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8 bg-white mt-4 mx-4 lg:mx-12 rounded-md ">
      <div className="flex md:flex-nowrap lg:gap-11 md:gap-4 items-center justify-between max-w-3xl mx-auto max-md:flex-col-reverse max-md:flex">
        <div className="md:w-2/4">
          <h1 className="text-4xl font-semibold leading-9 text-gray-800 dark:text-white">
            {product.title}
          </h1>
          <p className="text-base leading-6 mt-4 text-gray-600 dark:text-gray-100">
            {product.description}
          </p>
          <div className="flex gap-4">
            <a
              href={"/products/" + product._id}
              className="  font-semibold  text-gray-800 btn-default bg-gray-200 "
            >
              Ver mas
            </a>
            <button
              onClick={addFeaturedToCart}
              className=" btn-default btn-blue focus:ring-gray-700   font-semibold  text-gray-800  flex items-center "
            >
              Agregar al Carrito
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="md:w-2/4 lg:mt-0 max-md:m-0 mt-8 ">
          <div className="">
            <img
              src={product.images[0]}
              alt="apartment design"
              className=" block min-w-full  h-96"
            />
          </div>
          {/* <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 lg:gap-8 gap-6 lg:mt-8 md:mt-6 mt-4">
            <img
              src="https://i.ibb.co/4Jrp5TB/pexels-max-vakhtbovych-6782370-1.png"
              className="w-full"
              alt="kitchen"
            />
            <img
              src="https://i.ibb.co/0Jv3FSy/pexels-max-vakhtbovych-6436799-1-1.png"
              className="w-full"
              alt="sitting room"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

/* <div className="mt-4 mx-4 max-w-2xl bg-white rounded-xl shadow-md overflow-hidden md:max-w-full md:mx-12 ">
  <div className="md:flex">
    <div className="md:shrink-0 p-2 min-h-fit md:h-80 md:w-">
      <img className=" w-full object-cover md:h-full " src="https://t4.ftcdn.net/jpg/06/01/14/23/360_F_601142328_VnY6DMf1sC0RULodemaCSrvXSlFhO1lA.jpg" alt="Modern building architecture"/>
    </div>
    <div className="p-8 max-sm:h-44">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div>
      <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
      <p className="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
    </div>
  </div>
</div> */

//   <div className="bg-white m-4 p-2 rounded-md flex flex-wrap gap-12 md:mx-12 md:rounded-lg   max-sm:grid-cols-1 max-sm:">
//   <div className="max-sm:grow min-h-full border-2 w-full">
//     <h1>Producto Destacado</h1>
//     <p>lorem ipssdaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa </p>
//     <button>Agregar al Carrito</button>
//     <button>Leer Mas</button>
//   </div>
//   <div className='w-full'>
//     <img className="" src="https://t4.ftcdn.net/jpg/06/01/14/23/360_F_601142328_VnY6DMf1sC0RULodemaCSrvXSlFhO1lA.jpg" />
//   </div>
// </div>

//el codigo parecido al figma
// <div className="flex justify-center w-full">
//   <div className="p-4 border-2 md:mx-12 w-full ">
//     <div className="block relative h-96  overflow-hidden ">
//       <div className="absolute  border-4 h-full w-full pl-24 pt-12">
//         <h1 className="font-semibold text-4xl mb-20">Tendencia - Novedades</h1>
//         <button className="bg-white px-12 py-2 rounded-md font-semibold">Ver mas</button>
//       </div>

//       <img
//         className="w-full "
//         src={
//           "https://img.freepik.com/fotos-premium/auriculares-inalambricos-banco-energia-bateria-portatil-externo-sobre-fondo-azul-rosa-vista-superior-plano_175682-34486.jpg?w=826"
//         }
//       />
//     </div>
//   </div>
// </div>
