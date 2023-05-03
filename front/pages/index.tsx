import Featured from "@/components/Featured"
import Header from "@/components/Header"
import NewProducts from "@/components/NewProducts"
import { mongooseConnect } from "@/lib/mongoose"
import { Product } from "@/models/Product"

type Props = {
  featuredProduct: typeof Product,
  newProducts: typeof Product[]
}

export async function getServerSideProps() {
  const featuredProductId = '64506fc3b4d3d0f481e3acc5'
  await mongooseConnect()
  const featuredProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 10})

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    }
  }
}

const HomePage= ({featuredProduct, newProducts} : Props) => {
  console.log()
  return (
    <div className="p-0">
      <Header/>
      <Featured product={featuredProduct}></Featured>
      <NewProducts products={newProducts}/>
    </div>
  )
}

export default HomePage