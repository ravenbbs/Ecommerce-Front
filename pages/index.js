import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function Home({product}) {
  console.log(product)
  return (
    <div>
    <Header/>
    <Featured/>
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