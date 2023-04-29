import { NextApiRequest, NextApiResponse } from 'next'
import {Category} from '@/models/Category';
import mongoose from 'mongoose';
import { mongooseConnect } from '@/lib/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions, isAdminRequest } from './auth/[...nextauth]';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
  const {method} = req
  await mongooseConnect()
  await isAdminRequest(req, res)  

  if (method === 'POST') {
    // create a new category
    const {name, parent, properties} = req.body
    const categoryDoc = await Category.create({
      name, 
      parent,
      properties
    }) 
    res.status(200).json(categoryDoc)
  } else if (method === 'GET') {
    // get all categories
    const categories = await Category.find({}).populate('parent')
    res.status(200).json(categories)
  } else if (method == 'PUT') {
    // update a category
    const {_id, name, parent, properties} = req.body
    const categoryDoc = await Category.updateOne({_id}, {
      name,
      parent,
      properties
    })
    res.status(200).json(categoryDoc)
  } else if (method == 'DELETE') {
    // delete a category
    const {_id} = req.query
    const categoryDoc = await Category.deleteOne({_id})
    res.status(200).json(categoryDoc)
  }
}