import { Link } from "@remix-run/react"

const ProductCard = ({ product }) => {
   const {price, compareAtPrice} = product.variants?.nodes[0] || {}
   const isDiscounted = compareAtPrice?.amount > price?.amount

   return (
      <Link to={`/products/${product.handle}`}>
         <div className="grid gap-6">
            <div className="shadow-sm rounded relative">
               {isDiscounted && (
                  <label className="subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice text-red-600 text-xs">
                     Sale
                  </label>
               )}
            </div>
         </div>
      </Link>
   )
}
export default ProductCard
