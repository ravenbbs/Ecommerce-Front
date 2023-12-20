import { RevealWrapper } from "next-reveal";
import ProductBox from "./ProductBox";

export default function NewProducts({ products }) {
  return (

    <div className=" lg:px-20 md:px-6 px-4 md:py-12 py-8  mt-4 mx-4 lg:mx-12 rounded-md  ">
      <h2 className="mb-8 font-bold text-2xl bg-white rounded-md px-4 py-1">Artículos Nuevos</h2>
      <RevealWrapper delay={150} className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products?.length > 0 &&
          products.map((product) => <ProductBox key={product._id} {...product} />)}
      </RevealWrapper>
    </div>
  );
}
