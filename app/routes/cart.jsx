
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
   return <div>Cart</div>
}
export default Cart
