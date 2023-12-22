import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]";

export default function CategoriesPage({ mainCategories, categoriesProducts, wishedProducts }) {
  return (
    <>
      <Header />
      <div className=" lg:px-20 md:px-6 px-4 md:py-12 py-8 bg-white mt-4 mx-4 lg:mx-12 rounded-md  ">
        {mainCategories.map((cat) => (
          <div key={cat._id}>
            <a 
            href={'/category/' + cat._id}
            className="mb-2 font-bold text-2xl">{cat.name}</a>
            <hr className=" mb-6 border border-blue-200 rounded-full" />
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-6">
              {categoriesProducts[cat._id].map((p, index) => (
                <ProductBox key={p._id} {...p} wished={wishedProducts.includes(p._id)} />
              ))}
              <Link 
              href={'/category/' + cat._id}
              className=" flex gap-4 items-center justify-center overflow-hidden bg-gray-100 shadow-md rounded-xl h-full border ">
                <p className="font-bold">Ver Más </p>
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
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter(c => !c.parent);
  const categoriesProducts = {}; // catId => [products]
  const allFetchedProductsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter(c => c?.parent?.toString() === mainCatId)
      .map(c => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({category: categoriesIds}, null, {limit:3,sort:{'_id':-1}});
    allFetchedProductsId.push(...products.map(p => p._id.toString()))
    categoriesProducts[mainCat._id] = products;
  }

  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
      userEmail:session?.user.email,
      product: allFetchedProductsId,
    })
    : [];

  return {
    props: {
      mainCategories: JSON.parse(
        JSON.stringify(mainCategories)
      ),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map(i => i.product.toString()),
    },
  };
}
