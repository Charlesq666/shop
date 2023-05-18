import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  if (req.method !== 'POST') {
    res.status(405).end() //Method Not Allowed
    return
  } 
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    products
  } = req.body

  await mongooseConnect()
  const productIds = JSON.parse(products)
  const uniqueIds = [...new Set(productIds)]
  const productsInfos = await Product.find({_id: {$in: uniqueIds}}) 
  
  let line_items = []
  for(const id of uniqueIds) {
    const info = productsInfos.find(p => p._id.toString() === id)
    const quantity = productIds.filter(p => p === id)?.length || 0
    if (quantity > 0 && info) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name: info.name},
          unit_amount: info.price * quantity
        } 
      })
    }
  }

  res.status(200).json({line_items})

}