import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import {Product} from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  await mongooseConnect()
  const {method} = req;
  if (method === 'POST') {
    const {title, description, price, images, category} = req.body;
    const productDoc = await Product.create({
      title, description, price, images, category
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
    const {_id, title, description, price, images, category} = req.body;
    await Product.updateOne({_id}, {title, description, price, images, category})
    res.status(200).json({message: 'Product updated'})
  } else if (method == 'DELETE') {
    if (req.query?.id) {
      await Product.deleteOne({_id: req.query.id})
    }
  }
}