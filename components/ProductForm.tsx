import axios from "axios"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Layout from "./Layout"
import { Spinner } from "./Spinner"
import { ReactSortable } from "react-sortablejs"

type Props = {
  title: string,
  description: string,
  price: string,
  _id: string
  images: string[]
}
const ProductForm = ( {
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages
}: Props) => {
  const [title, setTitle] = useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription)
  const [price, setPrice] = useState(existingPrice || '')
  const [images, setImages] = useState<string[]>(existingImages || [])
  const [gotoProducts, setGotoProducts] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  async function saveProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {title, description, price, images}
    if (_id) {
      //update product
      await axios.put('/api/products/', {...data, _id})
    } else {
      //create product
      await axios.post('/api/products', data)
    }
    setGotoProducts(true)
  }

  if (gotoProducts) {
    router.push('/products')
  }

  async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target?.files || []
    if (files?.length > 0) {
      setIsUploading(true)
      const data = new FormData()
      for (const file of files) {
        data.append('files', file)
      }
      const res = await axios.post('/api/upload', data, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      setImages(oldImages => {
        return [...oldImages, ...res.data.links]
      })
      setIsUploading(false)
    }
  }
  
  function updateImagesOrder(newImages: string[]) {
    setImages(newImages)
  }

  return (
    <form onSubmit={saveProduct}>
      <label> Product Name </label>
      <input 
        type="text" 
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label> Images </label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable 
          list={images} 
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {!!images?.length && images.map(link => (
            <div key={link} className="h-24">
              <img src={link} className="rounded-lg"/>
            </div>
          ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 p-1 flex items-center">
            <Spinner />
          </div>
        )}
        <label
          className="w-24 h-24 text-center flex items-center justify-center flex-col text-sm gap-1 text-gray-500 rounded-md bg-gray-200 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
          </svg>
          Upload 
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>

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
  )
}

export default ProductForm