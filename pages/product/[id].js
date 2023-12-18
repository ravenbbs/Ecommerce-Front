import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function ProductPage({product}){
  return (
    <>
    <Header hidden={'hidden'}/>
    <h1>{product.title}</h1>
    test producto
    </>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
