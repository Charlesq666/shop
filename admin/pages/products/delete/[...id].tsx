import Layout from "@/components/Layout"
import { Product } from "@/models/Product"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type Props = {}

const DeleteProductPage = (props: Props) => {
  const router = useRouter()
  const { id } = router.query
  const [productInfo, setProductInfo] = useState<typeof Product>()
  useEffect(() => {
    if (!id) return
    // get product
    axios.get('/api/products/?id=' + id)
      .then(res => setProductInfo(res.data))
  }, [id])
  function goBack() {
    router.push('/products')
  }

  async function deleteProduct() {
    axios.delete('/api/products/?id=' + id)
    goBack()
  }
  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete Product &nbsp; "{productInfo?.title}"?</h1>
      <div className="flex gap-2 justify-center">
        <button 
          className="btn-red"
          onClick={deleteProduct}
        > Yes </button>
        <button 
          className="btn-default"
          onClick={goBack}
        > No </button>
      </div>
    </Layout>
  )
}

export default DeleteProductPage