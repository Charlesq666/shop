import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import {Product} from '@/models/Product';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  mongoose.Promise = clientPromise
  const {method} = req;
  if (method === 'POST') {
    const {title, description, price} = req.body;
    const productDoc = await Product.create({
      title, description, price
    }) // @ts-ignore
    res.status(200).json(productDoc)
  } else if (method === 'GET') {
    const products = await Product.find({}); // @ts-ignore
    res.status(200).json(products)
  }
}