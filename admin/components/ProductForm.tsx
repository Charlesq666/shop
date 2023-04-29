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
  images: string[],
  category: string,
  properties: any
}
const ProductForm = ( {
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: existingProductProperties
}: Props) => {
  const [title, setTitle] = useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription)
  const [price, setPrice] = useState(existingPrice || '')
  const [images, setImages] = useState<string[]>(existingImages || [])
  const [gotoProducts, setGotoProducts] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const [categories, setCategories] = useState([])  
  const [category, setCategory] = useState(existingCategory)
  const [productProperties, setProductProperties] = useState(existingProductProperties || [])

  useEffect(() => {
    axios.get('/api/categories')
      .then(res => {
        setCategories(res.data)
      })
  }, [])

  async function saveProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {title, description, price, images, category, 
      properties: productProperties
    }
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
  
  const propertiesToFill = []
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id === category)
    propertiesToFill.push(...catInfo.properties)
    while(catInfo?.parent?._id) {
      const parentCat = categories.find( ({_id}) => _id === catInfo?.parent?._id)
      propertiesToFill.push(...parentCat.properties)
      catInfo = parentCat
    } 
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

      <label> Categories </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">None</option>
        {categories.length > 0 && categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>

      {/* PROPERTIES OF PRODUCT */}
      {propertiesToFill.length > 0 && propertiesToFill.map((p, index) => (
        <div key={index} className="">
          <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
          <div>
            <select
              value = {productProperties[p.name]}
              onChange={(e) => {
                if(e.target.value !== "") {
                  setProductProperties( prev => {
                    return {...prev, [p.name]: e.target.value}
                  })}
                }
              }
            >
              <option value="">None</option>
              {p.values.map((v, j) => (
                <option key={j} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <label> Images </label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable 
          list={images} 
          setList={(newImages) => setImages(newImages)}
          className="flex flex-wrap gap-1"
        >
          {!!images?.length && images.map(link => (
            <div key={link} className="h-24 bg-white p-1 shadow-sm border border-gray-200">
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
          className="w-24 h-24 text-center flex items-center justify-center flex-col text-sm gap-1 text-gray-500 rounded-sm bg-white cursor-pointer shadow-sm border border-gray-200"
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