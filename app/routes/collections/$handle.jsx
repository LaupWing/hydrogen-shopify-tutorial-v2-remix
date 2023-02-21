import { useLoaderData } from "@remix-run/react"
import { json } from "@shopify/remix-oxygen"

const seo = ({data}) => ({
   title: data?.collection?.title,
   description: data?.collection?.description
})

export const handle = {
   seo
}

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

export const meta = ({data}) => {
   return {
      title: data?.collection?.title,
      description: data?.collection?.description
   }
}

const CollectionPage = () => {
   const {collection} = useLoaderData()
   
   return (
      <>
         <header className="grid w-full gap-8 py-8 justify-between items-start">
            <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
               {collection.title}
            </h1>
            {collection.description && (
               <div className="flex items-baseline justify-between w-full">
                  <div>
                     <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                        {collection.description}
                     </p>
                  </div>
               </div>
            )}
         </header>
      </>
   )
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