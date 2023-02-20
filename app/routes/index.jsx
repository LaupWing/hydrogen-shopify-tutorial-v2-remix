
export const meta = () => {
   return {
      title: "Hydrogen",
      description: "A custom storefront powered by Hydrogen"
   }
}

const Index = () => {
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