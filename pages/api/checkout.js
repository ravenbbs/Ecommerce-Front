import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  const { name, email, city, postalCode, streetAddress, cartProducts } = req.body;
  await mongooseConnect()

  const productsIds = cartProducts
  const uniqueIds = [...new Set(productsIds)]
  const productsInfos = await Product.find({_id:uniqueIds})

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  }
  const session = await getServerSession(req,res,authOptions);
  const orderDoc = await Order.create({
    line_items,name,email,city,postalCode,
    streetAddress,paid:false,
    userEmail: session?.user?.email,
  });
res.json(orderDoc)
}



