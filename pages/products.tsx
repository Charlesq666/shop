import Layout from "@/components/Layout";
import { Product } from "@/models/Product";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<typeof Product[]>([])
  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
  }, []) 
  return (
    <Layout>
      <Link 
        href={'/products/new'}
        className="bg-blue-900 text-white py-1 px-2 rounded-md "
      >Add new product</Link>

      <table className="basic mt-2">
        <thead>
          <tr>
            <td> Product name </td>
            <td></td>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr>
              <td> {product.title} </td>

            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}