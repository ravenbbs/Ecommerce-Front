import Featured from "@/components/Featured";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({product}) {
  return (
    <div>
    <Header/>
    <Featured product={product}/>
    <NewProducts />
    </div>
  )
}


export async function getServerSideProps(){

  const featuredProductId = '6579daddf0f819e6cae583aa'
  await mongooseConnect();
  const product = await Product.findById(featuredProductId)
  return {
    props: {product: JSON.parse(JSON.stringify(product))}
  }
}