import { useLoaderData } from "@remix-run/react"

export const meta = () => {
   return {
      title: "Hydrogen",
      description: "A custom storefront powered by Hydrogen"
   }
}

export async function loader({ context }) {
   return await context.storefront.query(COLLECTION_QUERY)
}

const Index = () => {
   const { collections } = useLoaderData()
   console.log(collections)

   return (
      <div>
         <h3>Hello from the homepage!</h3>
      </div>
   )
}
export default Index


const COLLECTION_QUERY = `#graphql
   query FeaturedCollection {
      collections(first: 3, query: "collection_type:smart"){
         nodes {
            id
            title
            handle
         }
      }
   }
`