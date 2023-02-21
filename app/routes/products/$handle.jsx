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
   const {product} = useLoaderData()

   return (
      <section className="w-full gap-4 md:gap-8 grid px-6 md:px-8 lg:px-12">
         <div className="grid items-start gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid md:grid-flow-row md:p-0 md:overflow-x-hidden md:grid-cols-2 md:w-full lg:col-span-2">
               <div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw] shadow rounded">
                  <h2>TODO product gallery</h2>
               </div>
            </div>
         </div>
      </section>
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
         descriptionHtml
         media(first: 10){
            nodes{
               ... on MediaImage {
                  mediaContentType
                  image {
                     id
                     url
                     altText
                     width
                     height
                  }
               }
            }
         }
         options {
            name
            values
         }
      }
   }
`