import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";
import { useSession } from "next-auth/react";

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
    <div className="pb-2 w-full  overflow-hidden bg-white shadow-md rounded-xl border pr-4">
      <div className="relative flex  items-center justify-between">
        <a className="flex items-center " href={"/product/" + _id}>
          <div className=" h-20 w-24 ">
            <img
              className="p-2 object-cover  max-h-20 transition duration-500  rounded hover:scale-110 "
              src={images?.[0]}
              alt="..."
            />
          </div>
          <h3 className="px-5 text-md font-bold mb-2  ">{title}</h3>
        </a>

        <div className="flex h-full">
          <button
            onClick={() => addProduct(_id)}
            className="mr- px-2 py-1 text-sm text-white duration-500  hover:scale-105 bg-blue-500   rounded-md font-bold"
          >
            Agregar al Carrito
          </button>
          {session && (
            <button
              onClick={addToWishlist}
              className="absolute top-0 right-0 p-3 rounded-l-none hover:scale-110 transition-all "
            >
              <HeartSolidIcon color={isWished ? "#ff4f67" : "#aaaaaaa"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
