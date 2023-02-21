import { useLoaderData } from "@remix-run/react"
import { json } from "react-router"

export const loader = ({params}) => {
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
