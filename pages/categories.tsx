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
  const [parentCategory, setParentCategory] = useState<string>("")
  const [categories, setCategories] = useState<string[]>([])
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
    const data = {name, parentCategory}
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
  }
  return (
    <Layout>
      <h1>Categories</h1>
      
      {/* CREATING CATEGORY */}
      <label> {editedCategory 
                ? `Edit category ${editedCategory.name}`
                : 'Create new category'}
      </label>
      <form className="flex gap-1" onSubmit={saveCategory}>
        <input 
          className="my-0" 
          type="text" 
          placeholder={"Category name"}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select 
          className="mb-0"
          onChange={(e) => setParentCategory(e.target.value)}
          value={parentCategory}
        >
          <option value="0">No parent category</option>
          {categories.length > 0 && categories.map((category, index) => (
            <option key={index} value={category._id}>{category.name}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary py-1">Save</button>
      </form>

      {/* LISTING CATEGORIES */}
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
    </Layout>
  )
}

export default withSwal(({swal}, ref) => (
  <Categories swal={swal}/>
))