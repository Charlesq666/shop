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
  
  mongoose.connect(process.env.MONGODB_URI)
  const {method} = req;
  if (method === 'POST') {
    const {title, description, price, images} = req.body;
    const productDoc = await Product.create({
      title, description, price, images
    }) // @ts-ignore
    res.status(200).json(productDoc)
  } else if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({_id: req.query.id}))
    } else {
      const products = await Product.find({}); // @ts-ignore
      res.status(200).json(products)
    }
  } else if (method == 'PUT') {
    const {_id, title, description, price, images} = req.body;
    await Product.updateOne({_id}, {title, description, price, images})
    res.status(200).json({message: 'Product updated'})
  } else if (method == 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id: req.query.id})
    }
  }
}