import Layout from "@/components/Layout"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"

const NewProduct= () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [gotoProducts, setGotoProducts] = useState(false)
  const router = useRouter()

  async function createProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {title, description, price}
    await axios.post('/api/products', data)
    setGotoProducts(true)
  }

  if (gotoProducts) {
    router.push('/products')
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1> New Product </h1>

        <label> Product Name </label>
        <input 
          type="text" 
          placeholder="product name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label> Description </label>
        <textarea 
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label> Price in USD</label>
        <input 
          type="text" 
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type='submit' className="btn-primary"> Save </button>
      </form>
    </Layout>
  )
}

export default NewProduct