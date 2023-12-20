import { useContext } from "react";
import { CartContext } from "./CartContext";
import HeartSolidIcon from "./icons/HeartSolidIcon";

export default function ProductBox({ _id, title, description, price, images }) {
  const {addProduct} = useContext (CartContext)

  return (
    <div className="relative overflow-hidden bg-white shadow-md rounded-xl h-fit border ">
      <div className="relative overflow-hidden">
         <a href={'/product/' + _id}>
          <div className="mb-2  h-52 flex justify-center items-center">
          <img
            className="p-2 object-cover w-auto mx-auto transition-all max-h-52  rounded hover:scale-110"
            src={images?.[0]}
            alt="..."
          />
        </div>  
        
        <h3 className="px-5 mb-4 text-lg font-bold h-12 ">
        {title}
        </h3>
      </a>
        <button className="absolute top-0 left-0 p-3 rounded-l-none hover:t ">
        <HeartSolidIcon color={'#ff4f67'}/>
        </button>
      </div>
    
      <div className="flex">
        <div className="w-1/2 px-5 pb-3">
          <p className="text-lg font-bold text-blue-500 dark:text-blue-300">
            ${price}
          </p>
          <span className="block -mt-1 text-xs font-semibold text-gray-400 line-through">
            ${price += price * 0.12}
          </span>
        </div>
        <button onClick={() => addProduct(_id) } className="w-full px-1 text-sm text-white transition-all bg-blue-500 rounded-r-none hover:bg-blue-600 rounded-t-xl font-bold">
          Agregar al Carrito 
        </button>
      </div>
    </div>
  );
}
