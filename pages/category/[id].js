import Header from "@/components/Header";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { useEffect, useState } from "react";

export default function CategoryPage({ category,subCategories, products:originalProducts }) {

  const [products, setProducts] = useState(originalProducts)
  const [filtersValues, setFiltersValues] = useState(
    category.properties.map(p => ({name:p.name, value:'all'}))
  )
function handleFilterChange(filterName, filterValue){
  setFiltersValues( prev => {
    return prev.map(p => ({
      name:p.name,
      value: p.name === filterName ? filterValue : p.value
    }))

  })
}
useEffect(() => {
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
}, [filtersValues])


  return (
    <>
      <Header />
      <div className=" lg:px-20 max-sm:px-0  px-4 md:py-12 py-8 mt-4 mx-4 lg:mx-12 rounded-md  ">
        <div className="flex justify-between  items-baseline ">
          <h1 className="mb-2">{category.name}</h1>
          <div className="flex gap-8 max-sm:gap-4 items-baseline w-fit max-w-sm ">
            {category.properties.slice(0, 2).map((prop) => (
              <div key={prop.name} className="bg-blue-200 px-1 py-1 mb-2 rounded-md font-semibold">
                {prop.name}
                <select 
                onChange={ev => handleFilterChange(prop.name, ev.target.value)}
                value={filtersValues.find(f => f.name === prop.name).value}
                className="bg-white rounded-sm block py-0  px-1 text-sm font-semibold text-gray-800 bg-transparent border-none  ">
                <option className="font-semibold" value='all'>Todos</option>
                  {prop.values.map((val) => (
                    <option key={val} className="font-semibold" value={val}>{val}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        <hr className=" mb-6 border border-blue-300 rounded-full" />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mb-6">
          {products?.length > 0 &&
            products.map((product, index) => <ProductBox key={product._id} {...product} />)}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });
  console.log(category);
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      category: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
