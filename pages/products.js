import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function ProductsPage({ products, wishedProducts }) {
  return (
    <>
      <Header />
      <div className=" lg:px-20 md:px-6 px-4 md:py-12 py-8 bg-white mt-4 mx-4 lg:mx-12 rounded-md  ">
      <h2 className="mb-8 font-bold text-2xl">Todos los productos</h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products?.length > 0 &&
          products.map((product) => <ProductBox key={product._id} {...product} wished={wishedProducts.includes(product._id)} />)}
      </div>

     
    </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail:session.user.email,
        product: products.map(p => p._id.toString()),
      })
    : [];
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      wishedProducts: wishedProducts.map(i => i.product.toString()),

    },
  };
}
