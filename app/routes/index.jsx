import { Link, useLoaderData } from "@remix-run/react"

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

   return (
      <section className="w-full gap-4">
         <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">Collections</h2>
         <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
            {collections.nodes.map((collection) => {
               return (
                  <Link 
                     to={`/collections/${collection.handle}`}
                     key={collection.id}
                  >
                     {collection.title}
                  </Link>
               )
            })}
         </div>
      </section>
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