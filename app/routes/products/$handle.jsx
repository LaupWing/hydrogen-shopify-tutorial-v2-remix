import { useLoaderData } from "@remix-run/react"
import { json } from "react-router"

export const loader = ({params, context}) => {
   const { handle } = params

   return json({
      handle
   })
}

const ProductHandle = () => {
   const {handle} = useLoaderData()

   return (
      <div className="product-wrapper">
         <h2>Product handle: {handle}</h2>
      </div>
   )
}

export default ProductHandle

const PRODUCT_QUERY = `#graphql
   query product($handle: String!){
      product(handle: $handle){
         id
         title
         handle
         vendor
      }
   }
`