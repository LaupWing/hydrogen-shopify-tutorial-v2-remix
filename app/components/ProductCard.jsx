import { Link } from "@remix-run/react"

const ProductCard = ({ product }) => {

   return (
      <Link to={`/products/${product.handle}`}>
         <div className="grid gap-6">
            <div className="shadow-sm rounded relative">
               
            </div>
         </div>
      </Link>
   )
}
export default ProductCard
