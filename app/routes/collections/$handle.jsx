import { useLoaderData } from "@remix-run/react"
import { json } from "@shopify/remix-oxygen"

export const loader = async  ({ params, context}) => {
   const { handle } = params
   const { collection } = await context.storefront.query(COLLECTION_QUERY, {
      variables: {
         handle
      }
   })

   if(!collection){
      throw new Response(null, { status: 404 })
   }

   return json({
      collection
   })
}

const CollectionPage = () => {
   const {collection} = useLoaderData()
   console.log(collection)
   return <div>CollectionPage</div>
}
export default CollectionPage

const COLLECTION_QUERY = `#graphql
   query CollectionDetails($handle: String!){
      collection(handle: $handle){
         title
         description
         handle
      }
   }
`