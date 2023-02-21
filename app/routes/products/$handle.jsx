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
   const {handle, product} = useLoaderData()

   return (
      <div className="product-wrapper">
         <h2>Product handle: {handle}</h2>
         <PrintJson data={product}/>
      </div>
   )
}

export default ProductHandle

const PrintJson = ({ data }) => {
   return (
      <details className="outline outline-2 outline-blue-300 py-4 my-2">
         <summary>Product JSON</summary>
         <pre>{JSON.stringify(data, null, 2)}</pre>
      </details>
   )
}

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