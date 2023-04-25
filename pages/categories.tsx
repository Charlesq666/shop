import Layout from "@/components/Layout"
import axios from "axios"
import { useEffect, useState } from "react"
import { withSwal } from "react-sweetalert2"

type Props = {
  swal: any
}

function Categories( {swal}: Props) {
  const [editedCategory, setEditedCategory] = useState(null)
  const [name, setName] = useState<string>("")
  const [parentCategory, setParentCategory] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [properties, setProperties] = useState<string[]>([])
  useEffect(() => {
    fetchCategories()
  }, [])

  function fetchCategories() {
    axios.get('/api/categories')
      .then(res => {
        setCategories(res.data)
      })
  }

  function editCategory(category) {
    setEditedCategory(category)
    setName(category.name)
    setParentCategory(category.parent?._id)
  }

  function deleteCategory(category) {
    swal.fire({
      title: `Are you sure you want to delete ${category.name}?`,
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d55',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/api/categories?_id=${category._id}`)
        fetchCategories()
        swal.fire(
          'Deleted!',
          'Your category has been deleted.',
          'success'
        )
      }
    })
  }
  
  async function saveCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      name,
      parent: parentCategory || null,
      // properties: properties.map(p => {
      //   name: p.name, 
      //   values: p.values.split(',') 
      // })
    }
    // if parent category i "" don't include it in the data
    if (editedCategory) {
      data._id = editedCategory._id
      await axios.put('/api/categories/', data)
      setEditedCategory(null)
    } else {
      await axios.post('/api/categories', data)
    }
    setName("")
    setParentCategory("")
    fetchCategories()
    setProperties([])
  }

  return (
    <Layout>
      <h1>Categories</h1>
      
      {/* CREATING CATEGORY */}
      <label> {editedCategory 
                ? `Edit category ${editedCategory.name}`
                : 'Create new category'}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input 
            type="text" 
            placeholder={"Category name"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <select 
            onChange={(e) => setParentCategory(e.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.length > 0 && categories.map((category, index) => (
              <option key={index} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* ADD PROPERTIES */}
        <div className="mb-2">
          <label className="block">Properties</label>
          <button 
            type="button" 
            className="btn-default text-sm mb-2"
            onClick= {() => 
              setProperties(prev => [...prev, {name: "", values: ""}])
            }
          >
            Add new property
          </button>

          {properties.length > 0 && properties.map((property, index) => (
            <div key={index} className="flex gap-1 mt-1 mb-2">
              <input
                className="mb-0"
                type="text"
                placeholder="Property name"
                value={property.name}
                onChange={(e) => {
                  setProperties(prev => {
                    const newProperties = [...prev]
                    newProperties[index].name = e.target.value
                    return newProperties
                  })
                }}
              />
              <input
                className="mb-0"
                type="text"
                placeholder="Property values, separated by comma"
                value={property.values}
                onChange={(e) => {
                  setProperties(prev => {
                    const newProperties = [...prev]
                    newProperties[index].values = e.target.value
                    return newProperties
                  })
                }}
              />

              {/* REMOVE BUTTON */}
              <button 
                className="btn-default text-sm" 
                type="button" 
                onClick={() => {
                  setProperties(prev => {
                    return [...prev].filter((_, i) => i !== index)
                  })
                }}
              >
                remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          {editedCategory && (
            // CANCEL edited BUTTON
            <button
              type='button'
              className="btn-default"
              onClick={() => {
                setEditedCategory(null)
                setName("")
                setParentCategory("")
                setProperties([])
              }}    
            >
              cancel
            </button>
          )}

          {/* SAVE BUTTON */}
          <button 
            type="submit" 
            className="btn-primary py-1">
              Save
          </button>
          </div>
      </form>

      {/* LISTING CATEGORIES */}
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent Category</td>
              <td></td>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 && categories.map((category, index) => (
              <tr key={index}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button 
                    onClick={() => editCategory(category)} 
                    className="btn-primary py-1 mr-1"
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-primary py-1"
                    onClick={() => deleteCategory(category)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  )
}

export default withSwal(({swal}, ref) => (
  <Categories swal={swal}/>
))