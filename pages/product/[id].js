import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import ProductReviews from "@/components/ProductReviews";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext, useState } from "react";

export default function ProductPage({ product }) {
  const [activeImage, setActiveImage] = useState(product.images?.[0]);
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header hidden={"hidden"} />
      <section className="relative overflow-hidden bg-white py-11 shadow-lg m-2 rounded-md xl:mx-12">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6 ">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 lg:h-2/4 max-h-96 ">
                  <img
                    src={activeImage}
                    alt={`${product.title} thumbnail`}
                    className=" max-w-lg mx-auto w-96 h-max px-4 max-h-full "
                  />
                </div>

                <div className="flex-wrap hidden md:flex ">
                  {product.images.slice(0, 4).map((image) => (
                    <div key={image} className={"w-1/2 p-2 sm:w-1/4"}>
                      <button
                        onClick={() => setActiveImage(image)}
                        className={`block border-2 border-blue-300 p-1  ${
                          activeImage === image
                            ? " border-blue-600"
                            : "  opacity-80"
                        }`}
                      >
                        <img
                          src={image}
                          alt=""
                          className="object-cover w-full lg:h-20"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2 ">
              <div className="lg:pl-20">
                <div className="mb-8 ">
                  <h2 className="max-w-xl mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    {product.title}
                  </h2>
                  <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                    <span>${product.price}</span>
                  </p>
                  <p className="max-w-md text-gray-700 dark:text-gray-400">
                    {product.description}
                  </p>
                </div>
                <div className="px-6  my-6 border-t border-gray-300 dark:border-gray-400 ">
                  <div className="flex flex-wrap items-center mt-6">
                    <span className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-7 h-6 text-gray-700"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">
                      Envío Gratis
                    </h2>
                  </div>
                  <div className=" px-7">
                    <p className="text-sm font-bold text-blue-400 dark:text-blue-200">
                      Compras a partir de $100
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => addProduct(product._id)}
                    className="w-full max-md:max-w-sm p-4 bg-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 text-gray-50 hover:bg-blue-600 font-bold transition-all mx-auto"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ProductReviews product={product} />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
