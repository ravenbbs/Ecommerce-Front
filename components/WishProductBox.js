import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";
import { RevealWrapper } from "next-reveal";

export default function WishProductBox({
  _id,
  title,
  description,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const [isWished, setIsWished] = useState(wished);

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
    <RevealWrapper className="pb-2 w-full relative overflow-hidden bg-white shadow-md rounded-xl h-fit border ">
      <div className="relative flex  flex-col  ">
        <a href={"/product/" + _id}>
          <div className=" h-20 ">
            <img
              className="p-2 object-cover  max-h-20 transition duration-500  rounded hover:scale-110 "
              src={images?.[0]}
              alt="..."
            />
          </div>
          <h3 className="px-5 text-md font-bold mb-2  ">{title}</h3>
        </a>
        <button
          onClick={addToWishlist}
          className="absolute top-0 right-0 m-3 rounded-l-none hover:scale-125 transition duration-500  "
        >
          <HeartSolidIcon color={isWished ? "#ff4f67" : "#aaaaaaa"} />
        </button>

        <div className=" px-4  text-right">
          <button
            onClick={() => addProduct(_id)}
            className=" px-2 py-1 text-sm text-white duration-500  hover:scale-105 bg-blue-500   rounded-md font-bold"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </RevealWrapper>
  );
}
