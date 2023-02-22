import { Link } from "@remix-run/react"

export async function action({request, context}){
   const {session, storefront} = context
   const headers = new Headers()

   const [formData, storedCartId, customerAccessToken] = await Promise.all([
      request.formData(),
      session.get("cartId"),
      session.get("customerAccessToken")
   ])
   let cartId = storedCartId

   let status = 200
   let result
}

const Cart = () => {
   return (
      <div className="flex flex-col space-y-7 justify-center items-center md:py-8 md:px-12 px-4 py-6 h-screen">
         <h2 className="whitespace-pre-wrap max-w-prose font-bold text-4xl">
            Your cart is empty
         </h2>
         <Link
            to={"/"}
            className="inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none bg-black text-white w-full"
         >
            Continue Shopping
         </Link>
      </div>
   )
}
export default Cart

export async function cartCreate({input, storefront}){
   const {cartCreate} = await storefront.mutate
}

const USER_ERROR_FRAGMENT = `#graphql
   fragment ErrorFragment on CartUserError {
      message
      field
      code
   }
`

const LINES_CART_FRAGMENT = `#graphql
   fragment CartLineFragment on Cart {
      id
      totalQuantity
   }
`