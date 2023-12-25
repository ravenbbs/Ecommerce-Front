import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const [isWished, setIsWished] = useState(wished);
  const { data: session } = useSession();

  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWished(nextValue);
  }

  const { addProduct } = useContext(CartContext);

  return (
    <RevealWrapper className="h-80 relative overflow-hidden bg-white shadow-md rounded-xl  border ">
      <div className="relative overflow-hidden">
        <a href={"/product/" + _id}>
          <div className="mb-3  h-48 flex justify-center items-center">
            <img
              className="p-2 object-cover w-auto mx-auto transition-all max-h-52  rounded hover:scale-110"
              src={images?.[0]}
              alt="..."
            />
          </div>

          <h3 className="text-left px-4 mb-4 text-lg font-bold h-12 ">
            {title}
          </h3>
        </a>
        {session && (
          <button
            onClick={addToWishlist}
            className="absolute top-0 right-0 p-3 rounded-l-none hover:scale-110 transition-all "
          >
            <HeartSolidIcon color={isWished ? "#ff4f67" : "#aaaaaaa"} />
          </button>
        )}
      </div>

      <div className="flex">
        <div className="w-1/2 px-2 pb-3">
          <p className="text-lg font-bold text-blue-500 dark:text-blue-300">
            ${price}
          </p>
          <span className="block -mt-1 text-xs font-semibold text-gray-400 line-through">
            ${(price += price * 0.12)}
          </span>
        </div>
        <button
          onClick={() => addProduct(_id)}
          className="w-full px-1 text-sm text-white transition-all bg-blue-500 rounded-r-none hover:bg-blue-600 rounded-t-xl font-bold"
        >
          Agregar al Carrito
        </button>
      </div>
    </RevealWrapper>
  );
}
