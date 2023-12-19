import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";

export default function CategoryPage({ category, products }) {
  return (
    <div className=" lg:px-20 md:px-6 px-4 md:py-12 py-8 bg-white mt-4 mx-4 lg:mx-12 rounded-md  ">
      <Header />

      <h1>{category.name}</h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-6">
        {products?.length > 0 &&
          products.map((product, index) => <ProductBox {...product} />)}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
