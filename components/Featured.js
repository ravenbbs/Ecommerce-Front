
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { RevealWrapper } from "next-reveal";


export default function Featured({ product }) {
const {addProduct} = useContext(CartContext)

function addFeaturedToCart(){
  addProduct(product._id)
}

  return (

    <div  className="lg:px-20 md:px-6 px-4 md:py-12 py-8 bg-white mt-4 mx-4 lg:mx-12 rounded-md ">
      
      <RevealWrapper delay={100} className="flex md:flex-nowrap lg:gap-11 md:gap-4 items-center justify-between max-w-3xl mx-auto max-md:flex-col-reverse max-md:flex">
        <div className="md:w-2/4">
          <h2 className="text-3xl font-semibold leading-9 text-gray-800 dark:text-white">
            {product.title}
          </h2>
          <p className="text-base leading-6 mt-4 text-gray-600 dark:text-gray-100">
            {product.description}
          </p>
          <div className="flex gap-4">
            <a
              href={"/product/" + product._id}
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
          <a href={"/product/" + product._id}>
            <img
              src={product.images[0]}
              alt="apartment design"
              className=" block min-w-full  h-96"
            />
            </a>
          </div>
        </div>
      </RevealWrapper>
    </div>
  );
}


