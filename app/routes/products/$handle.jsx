import { useLoaderData } from "@remix-run/react"
import { json } from "react-router"

export const loader = async ({params, context}) => {
   const { handle } = params
   const { product } = await context.storefront.query(
      PRODUCT_QUERY,
      {
         variables: {
            handle
         }
      }
   )

   if(!product?.id){
      throw new Response(null, {status: 404})
   }

   return json({
      handle,
      product
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