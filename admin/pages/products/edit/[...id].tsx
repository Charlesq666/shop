import Layout from "@/components/Layout"
import ProductForm from "@/components/ProductForm"
import { Product } from "@/models/Product"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type Props = {
}

const EditProductPage = ( {} : Props) => {
  const [productInfo, setProductInfo] = useState<typeof Product>()
  const router = useRouter()
  const id = router.query.id
  useEffect(() => {
    if (!id) return
    axios.get('/api/products?id=' + id)
      .then(res => setProductInfo(res.data))
  }, [id])
  return (
    <Layout>
      <h1> Edit Product </h1>
      {productInfo && (
        <ProductForm {...productInfo}/>
      )}
    </Layout>
  )
}

export default EditProductPage